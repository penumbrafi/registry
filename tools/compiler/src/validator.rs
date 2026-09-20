use crate::error::AppResult;

use crate::parser::ValidatorInput;
use penumbra_asset::asset::Metadata;
use penumbra_proto::core::asset::v1::DenomUnit;
use penumbra_proto::penumbra::core::asset::v1 as pb;
use std::path::Path;

/// Directory holding validator logos, relative to the compiler's working dir.
const LOCAL_VALIDATOR_IMAGE_DIR: &str = "../../images/validators";
/// Public base URL the same directory is served from.
const VALIDATOR_IMAGE_URL_BASE: &str =
    "https://raw.githubusercontent.com/penumbrafi/registry/main/images/validators";

/// Derive a validator's logo from its identity key.
///
/// Logos are named after the identity key, so the URL is a pure function of
/// `base` (`udelegation_<key>`) and does not need to be written out by hand.
/// Returns nothing when the file is absent: the compiler fetches every image it
/// emits in order to extract dominant colors, so emitting a URL for a logo that
/// does not exist would fail the build.
fn derive_images(base: &str) -> Vec<pb::AssetImage> {
    let Some(key) = base.strip_prefix("udelegation_") else {
        return vec![];
    };
    if !Path::new(LOCAL_VALIDATOR_IMAGE_DIR)
        .join(format!("{key}.png"))
        .exists()
    {
        return vec![];
    }
    vec![pb::AssetImage {
        png: format!("{VALIDATOR_IMAGE_URL_BASE}/{key}.png"),
        ..Default::default()
    }]
}

pub fn generate_metadata_from_validators(
    validators: &[ValidatorInput],
) -> AppResult<Vec<Metadata>> {
    validators
        .iter()
        .map(|v| {
            // udelegation_penumbravalid1... -> estdelegation_penumbravalid1...
            let display_denom = v.base.chars().skip(1).collect::<String>();

            let pb_metadata = pb::Metadata {
                symbol: format!("delUM({})", v.name),
                base: v.base.clone(),
                images: if v.images.is_empty() {
                    derive_images(&v.base)
                } else {
                    v.images.clone()
                },
                display: display_denom.clone(),
                denom_units: vec![
                    DenomUnit {
                        denom: v.base.clone(),
                        exponent: 0,
                        aliases: vec![],
                    },
                    DenomUnit {
                        denom: format!("m{}", display_denom.clone()),
                        exponent: 3,
                        aliases: vec![],
                    },
                    DenomUnit {
                        denom: display_denom,
                        exponent: 6,
                        aliases: vec![],
                    },
                ],
                ..Default::default()
            };

            Ok(Metadata::try_from(pb_metadata)?)
        })
        .collect()
}
