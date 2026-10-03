//! Image URLs in the published registry point at registry.penumbra.fi, which
//! mirrors this repository and caches the cosmos chain-registry icons, so a
//! wallet showing an icon never sends its user to GitHub. Inputs keep the
//! GitHub URLs (the build reads those to pick colours); only the output is
//! rewritten.

pub const MIRROR_BASE: &str = "https://registry.penumbra.fi";

const REWRITES: &[(&str, &str)] = &[
    (
        "https://raw.githubusercontent.com/penumbrafi/registry/main/images/",
        "/images/",
    ),
    (
        "https://raw.githubusercontent.com/cosmos/chain-registry/",
        "/cosmos/chain-registry/",
    ),
];

/// The serialized registry with GitHub image URLs moved to the mirror.
pub fn to_mirror(json: &str) -> String {
    REWRITES.iter().fold(json.to_string(), |s, (from, to)| {
        s.replace(from, &format!("{MIRROR_BASE}{to}"))
    })
}
