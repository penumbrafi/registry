use penumbra_registry::transparent::{transparent_chain, TransparentInput};
use serde_json::json;

fn chain() -> serde_json::Value {
    json!({
        "chain_name": "axelar",
        "bech32_prefix": "axelar",
        "slip44": 118,
        "key_algos": ["secp256k1"],
        "fees": { "fee_tokens": [{ "denom": "uaxl", "average_gas_price": 0.007 }] },
        "apis": {
            "rpc": [
                { "address": "https://axelar-rpc.polkachu.com/" },
                { "address": "https://rpc.some-validator.example" },
                { "address": "http://axelar-rpc.publicnode.com" }
            ],
            "rest": [{ "address": "https://lcd.some-validator.example" }]
        }
    })
}

fn assets() -> serde_json::Value {
    json!({ "assets": [{
        "base": "uaxl", "display": "axl", "symbol": "AXL",
        "denom_units": [{ "denom": "uaxl", "exponent": 0 }, { "denom": "axl", "exponent": 6 }]
    }]})
}

#[test]
fn takes_only_trusted_https_nodes_and_falls_back_to_cosmos_directory() {
    let t = transparent_chain(&chain(), &assets(), &TransparentInput::default()).unwrap();
    assert_eq!(t.rpc, vec!["https://axelar-rpc.polkachu.com"]);
    assert_eq!(t.rest, vec!["https://rest.cosmos.directory/axelar"]);
    assert_eq!(t.gas_price, "0.007uaxl");
    assert_eq!(
        (t.bech32_prefix.as_str(), t.coin_type, t.decimals),
        ("axelar", 118, 6)
    );
    assert_eq!(t.symbol, "AXL");
}

#[test]
fn input_overrides_win() {
    let input = TransparentInput {
        rpc: vec!["https://rpc.my-node.example".into()],
        coin_type: Some(459),
        gas_price: Some(0.01),
        ..Default::default()
    };
    let t = transparent_chain(&chain(), &assets(), &input).unwrap();
    assert_eq!(t.rpc, vec!["https://rpc.my-node.example"]);
    assert_eq!(t.coin_type, 459);
    assert_eq!(t.gas_price, "0.01uaxl");
}

#[test]
fn leaves_out_ethermint_chains_and_disabled_ones() {
    let mut eth = chain();
    eth["key_algos"] = json!(["ethsecp256k1"]);
    assert!(transparent_chain(&eth, &assets(), &TransparentInput::default()).is_err());
    let off = TransparentInput {
        disabled: true,
        ..Default::default()
    };
    assert!(transparent_chain(&chain(), &assets(), &off).is_err());
}

#[test]
fn needs_a_fee_token_with_a_price_and_decimals() {
    let mut no_price = chain();
    no_price["fees"]["fee_tokens"] = json!([{ "denom": "uaxl" }]);
    assert!(transparent_chain(&no_price, &assets(), &TransparentInput::default()).is_err());
    assert!(transparent_chain(
        &chain(),
        &json!({ "assets": [] }),
        &TransparentInput::default()
    )
    .is_err());
}
