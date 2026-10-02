//! What a wallet needs to use the counterparty of an IBC connection as a
//! transparent chain: its address format, signing key path, fee token and a
//! few public nodes. Read from the chain's cosmos chain-registry entry, with
//! any field the registry gets wrong or lacks set in the connection's input.

use serde::{Deserialize, Serialize};
use serde_json::Value;

/// Node operators whose public endpoints a wallet may talk to by default.
/// A node sees which addresses it is asked about, so arbitrary registry
/// entries are not used; an operator not on this list goes in `rpc`/`rest`.
pub const TRUSTED_PROVIDERS: &[&str] = &[
    "polkachu.com",
    "publicnode.com",
    "cosmos.directory",
    "keplr.app",
];

/// Overrides for a connection's transparent chain, all optional.
#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct TransparentInput {
    /// RPC endpoints to use instead of the registry's trusted ones.
    #[serde(default, skip_serializing_if = "Vec::is_empty")]
    pub rpc: Vec<String>,
    /// REST endpoints to use instead of the registry's trusted ones.
    #[serde(default, skip_serializing_if = "Vec::is_empty")]
    pub rest: Vec<String>,
    /// SLIP-44 coin type, when the registry's is wrong or missing.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub coin_type: Option<u32>,
    /// Fee denom, when the registry's first fee token is not the one to use.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub fee_denom: Option<String>,
    /// Gas price in the fee denom, e.g. 0.025.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub gas_price: Option<f64>,
    /// Leave this chain out of the transparent set entirely.
    #[serde(default, skip_serializing_if = "std::ops::Not::not")]
    pub disabled: bool,
}

/// A counterparty a wallet can derive addresses on, sign for and query.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Transparent {
    /// the chain-registry name, e.g. "axelar"
    pub chain_name: String,
    pub bech32_prefix: String,
    pub coin_type: u32,
    /// the fee token, which is also the chain's native asset here
    pub denom: String,
    pub symbol: String,
    pub decimals: u32,
    /// "0.007uaxl"
    pub gas_price: String,
    pub rpc: Vec<String>,
    pub rest: Vec<String>,
}

fn host_of(url: &str) -> Option<&str> {
    let rest = url.strip_prefix("https://")?;
    let host = rest.split(['/', '?', '#']).next()?;
    Some(host.split(':').next().unwrap_or(host))
}

fn trusted(url: &str) -> bool {
    host_of(url).is_some_and(|h| {
        TRUSTED_PROVIDERS
            .iter()
            .any(|p| h == *p || h.ends_with(&format!(".{p}")))
    })
}

fn endpoints(chain: &Value, kind: &str, chain_name: &str, fallback_host: &str) -> Vec<String> {
    let mut list: Vec<String> = chain["apis"][kind]
        .as_array()
        .into_iter()
        .flatten()
        .filter_map(|e| e["address"].as_str())
        .map(|a| a.trim_end_matches('/').to_string())
        .filter(|a| trusted(a))
        .collect();
    list.dedup();
    if list.is_empty() {
        list.push(format!("https://{fallback_host}/{chain_name}"));
    }
    list
}

fn number(v: &Value) -> Option<f64> {
    v.as_f64()
}

/// Builds the transparent chain from its chain.json and assetlist.json, or
/// says why it can't be one. A chain is left out when its keys aren't plain
/// secp256k1 (Ethermint chains need their own signer), or when no fee token
/// with a gas price and decimals can be found.
pub fn transparent_chain(
    chain: &Value,
    assets: &Value,
    input: &TransparentInput,
) -> Result<Transparent, String> {
    if input.disabled {
        return Err("disabled in the input".into());
    }
    let chain_name = chain["chain_name"]
        .as_str()
        .ok_or("chain.json has no chain_name")?
        .to_string();
    if let Some(algos) = chain["key_algos"].as_array() {
        if algos.iter().any(|a| a.as_str() != Some("secp256k1")) {
            return Err(format!("{chain_name} keys are not plain secp256k1"));
        }
    }
    let bech32_prefix = chain["bech32_prefix"]
        .as_str()
        .ok_or("chain.json has no bech32_prefix")?
        .to_string();
    let coin_type = input
        .coin_type
        .or_else(|| chain["slip44"].as_u64().map(|n| n as u32))
        .unwrap_or(118);

    let fee_tokens = chain["fees"]["fee_tokens"]
        .as_array()
        .cloned()
        .unwrap_or_default();
    let fee = match &input.fee_denom {
        Some(d) => fee_tokens
            .iter()
            .find(|t| t["denom"].as_str() == Some(d))
            .cloned()
            .unwrap_or_else(|| serde_json::json!({ "denom": d })),
        None => fee_tokens
            .first()
            .cloned()
            .ok_or(format!("{chain_name} lists no fee token"))?,
    };
    let denom = fee["denom"]
        .as_str()
        .ok_or("fee token has no denom")?
        .to_string();
    let price = input
        .gas_price
        .or_else(|| number(&fee["average_gas_price"]))
        .or_else(|| number(&fee["low_gas_price"]))
        .or_else(|| number(&fee["fixed_min_gas_price"]))
        .ok_or(format!("{chain_name} has no gas price for {denom}"))?;

    let asset = assets["assets"]
        .as_array()
        .into_iter()
        .flatten()
        .find(|a| a["base"].as_str() == Some(&denom))
        .ok_or(format!("{chain_name} assetlist has no {denom}"))?;
    let display = asset["display"].as_str().unwrap_or_default();
    let decimals = asset["denom_units"]
        .as_array()
        .into_iter()
        .flatten()
        .find(|u| u["denom"].as_str() == Some(display))
        .and_then(|u| u["exponent"].as_u64())
        .ok_or(format!(
            "{chain_name} assetlist has no decimals for {denom}"
        ))? as u32;
    let symbol = asset["symbol"].as_str().unwrap_or(display).to_string();

    let rpc = if input.rpc.is_empty() {
        endpoints(chain, "rpc", &chain_name, "rpc.cosmos.directory")
    } else {
        input.rpc.clone()
    };
    let rest = if input.rest.is_empty() {
        endpoints(chain, "rest", &chain_name, "rest.cosmos.directory")
    } else {
        input.rest.clone()
    };

    Ok(Transparent {
        gas_price: format!("{price}{denom}"),
        chain_name,
        bech32_prefix,
        coin_type,
        denom,
        symbol,
        decimals,
        rpc,
        rest,
    })
}
