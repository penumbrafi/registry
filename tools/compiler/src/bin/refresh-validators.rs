//! Regenerate the `validators` array in a chain input from a live node.
//!
//! Validator names and identity keys are chain state rather than authored data,
//! so they are refreshed on demand instead of being queried during the build:
//! the registry build must stay reproducible from its inputs alone, which the
//! "Generate registry and Check for Diffs" CI job depends on.
//!
//! Logos are deliberately not written here. The compiler derives each logo URL
//! from the identity key when `images/validators/<key>.png` exists, so this
//! only records what cannot be derived: the name and the key.
//!
//! Usage:
//!     cargo run --bin refresh-validators -- [--rpc HOST[:PORT]] [--chain ID] [--check]
//!
//! `--check` exits non-zero if the file would change, for CI use.

use anyhow::{anyhow, bail, Context, Result};
use bech32::{Bech32m, Hrp};
use serde_json::{json, Map, Value};
use std::{path::PathBuf, process::Command};

const DEFAULT_RPC: &str = "penumbra.grpc.ghostinnet.com";
const DEFAULT_CHAIN: &str = "penumbra-1";
const VALIDATOR_INFO_METHOD: &str =
    "penumbra.core.component.stake.v1.QueryService/ValidatorInfo";

/// Ask a node for every validator it knows about, as (name, identity key).
fn query_validators(rpc: &str) -> Result<Vec<(String, String)>> {
    let target = if rpc.contains(':') {
        rpc.to_string()
    } else {
        format!("{rpc}:443")
    };

    let output = Command::new("grpcurl")
        .args([
            "-max-time",
            "60",
            "-d",
            r#"{"show_inactive":true}"#,
            &target,
            VALIDATOR_INFO_METHOD,
        ])
        .output()
        .context("running grpcurl (is it installed and on PATH?)")?;

    if !output.status.success() {
        bail!(
            "querying {target} failed:\n{}",
            String::from_utf8_lossy(&output.stderr).trim()
        );
    }

    // The response is a stream of concatenated JSON objects, not an array.
    let hrp = Hrp::parse("penumbravalid").expect("static hrp is valid");
    let stdout = String::from_utf8(output.stdout).context("grpcurl returned invalid UTF-8")?;
    let mut validators = Vec::new();

    for info in serde_json::Deserializer::from_str(&stdout).into_iter::<Value>() {
        let info = info.context("parsing grpcurl output")?;
        let validator = info
            .pointer("/validatorInfo/validator")
            .ok_or_else(|| anyhow!("response entry has no validatorInfo.validator"))?;

        let encoded = validator
            .pointer("/identityKey/ik")
            .and_then(Value::as_str)
            .ok_or_else(|| anyhow!("validator has no identityKey.ik"))?;
        let raw = base64_decode(encoded)?;
        let key = bech32::encode::<Bech32m>(hrp, &raw).context("encoding identity key")?;

        let name = validator
            .get("name")
            .and_then(Value::as_str)
            .unwrap_or(&key)
            .to_string();

        validators.push((name, key));
    }

    Ok(validators)
}

/// Minimal standard-alphabet base64 decoder, so this binary needs no extra dep.
fn base64_decode(input: &str) -> Result<Vec<u8>> {
    const ALPHABET: &[u8] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let mut acc: u32 = 0;
    let mut bits = 0u32;
    let mut out = Vec::new();

    for byte in input.bytes().filter(|b| *b != b'=' && !b.is_ascii_whitespace()) {
        let value = ALPHABET
            .iter()
            .position(|c| *c == byte)
            .ok_or_else(|| anyhow!("invalid base64 character {:?}", byte as char))?;
        acc = (acc << 6) | value as u32;
        bits += 6;
        if bits >= 8 {
            bits -= 8;
            out.push((acc >> bits) as u8);
        }
    }

    Ok(out)
}

fn main() -> Result<()> {
    let mut rpc = DEFAULT_RPC.to_string();
    let mut chain = DEFAULT_CHAIN.to_string();
    let mut check = false;

    let mut args = std::env::args().skip(1);
    while let Some(arg) = args.next() {
        match arg.as_str() {
            "--rpc" => rpc = args.next().ok_or_else(|| anyhow!("--rpc needs a value"))?,
            "--chain" => chain = args.next().ok_or_else(|| anyhow!("--chain needs a value"))?,
            "--check" => check = true,
            other => bail!("unrecognised argument: {other}"),
        }
    }

    let root = PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("../..");
    let path = root.join("input/chains").join(format!("{chain}.json"));
    let current = std::fs::read_to_string(&path)
        .with_context(|| format!("reading {}", path.display()))?;
    let mut config: Value = serde_json::from_str(&current)
        .with_context(|| format!("parsing {}", path.display()))?;

    let mut validators = query_validators(&rpc)?;
    if validators.is_empty() {
        bail!("node returned no validators; refusing to write an empty list");
    }
    validators.sort_by_key(|(name, _)| name.to_lowercase());

    let entries: Vec<Value> = validators
        .iter()
        .map(|(name, key)| {
            let mut entry = Map::new();
            entry.insert("name".into(), json!(name));
            entry.insert("base".into(), json!(format!("udelegation_{key}")));
            Value::Object(entry)
        })
        .collect();

    config
        .as_object_mut()
        .ok_or_else(|| anyhow!("chain input is not a JSON object"))?
        .insert("validators".into(), Value::Array(entries));

    let rendered = format!("{}\n", serde_json::to_string_pretty(&config)?);

    if check {
        if rendered != current {
            bail!(
                "{} is out of date; run: cargo run --bin refresh-validators",
                path.display()
            );
        }
        println!("{} is up to date ({} validators)", chain, validators.len());
        return Ok(());
    }

    std::fs::write(&path, rendered).with_context(|| format!("writing {}", path.display()))?;
    println!("wrote {} validators to {}", validators.len(), path.display());

    let images = root.join("images/validators");
    let missing: Vec<&str> = validators
        .iter()
        .filter(|(_, key)| !images.join(format!("{key}.png")).exists())
        .map(|(name, _)| name.as_str())
        .collect();
    if !missing.is_empty() {
        println!("no logo for: {}", missing.join(", "));
    }

    Ok(())
}
