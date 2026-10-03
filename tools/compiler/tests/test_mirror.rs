use penumbra_registry::mirror::to_mirror;

#[test]
fn moves_github_images_to_the_mirror() {
    let json = r#"{"a":"https://raw.githubusercontent.com/penumbrafi/registry/main/images/um.png","b":"https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png","c":"https://example.com/x.png"}"#;
    assert_eq!(
        to_mirror(json),
        r#"{"a":"https://registry.penumbra.fi/images/um.png","b":"https://registry.penumbra.fi/cosmos/chain-registry/master/osmosis/images/osmo.png","c":"https://example.com/x.png"}"#
    );
}
