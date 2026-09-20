---
'@penumbrafi/registry': patch
---

Add validator metadata for `penumbra-1`, giving delegation tokens names and
logos.

Each active validator now produces a delegation-token entry
(`udelegation_penumbravalid1…`, `symbol: delUM(<name>)`) carrying the
validator's logo, with a dominant colour extracted at build time for asset
theming. Previously these tokens had no metadata at all.

Covers the ten validators currently in the active set. Nine have logos; antumbra
is active but no logo exists for it yet.
