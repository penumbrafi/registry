---
'@penumbrafi/registry': minor
---

Add an optional `status` field to IBC connections. `Chain.status` is
`'active' | 'expired' | undefined` and records whether a connection can
currently carry a transfer; `'expired'` normally means the counterparty light
client has expired. Clients can use it to hide or disable a channel instead of
offering a withdrawal that will never arrive. The field is optional and purely
additive, so consumers that ignore it are unaffected.
