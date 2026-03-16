---
'@penumbrafi/registry': minor
---

Add a `wallets` list to globals. `RegistryGlobals` now exposes
`wallets: EntityMetadata[]`, populated from the new `wallets` array in
`registry/globals.json`, so clients can present the wallet software that works
with the chain the same way they already present RPCs and frontends. The field
is optional in the JSON, so older registry data still parses (`wallets` is then
an empty array).
