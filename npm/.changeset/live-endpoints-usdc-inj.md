---
'@penumbrafi/registry': patch
---

Refresh `globals.json` endpoints and promote `USDC.inj` to a numeraire.

Eight of the nine endpoints previously listed in `globals.json` were dead. The
`rpcs` list now carries only endpoints verified to serve pd gRPC on
`penumbra-1` at chain tip (ghostinnet, Rotko Networks, Validatus, Bryanlabs),
and `frontends`/`frontendsV2` carry only `penumbra.zechub.org`. Removed:
Radiant Commons (`penumbra-1.radiantcommons.com` now serves a certificate for
an unrelated domain, and `app.penumbra.zone` returns a disabled deployment),
CroutonDigital and Silent Validator (connection refused), Starling Cybernetics
(certificate does not match host), Whisper Node and voids.cloud (NXDOMAIN).

`transfer/channel-18/erc20:0xa00C59fF5a080D2b954d0c75e46E22a0c371235a`
(`USDC.inj`) is added to `canonicalNumeraires` and its priority score raised
above Noble USDC, so Injective USDC ranks as the preferred quote asset ahead of
Circle's deprecation of USDC on Noble. Noble USDC remains a numeraire until
that rail actually closes.

Data-only: no API change, and consumers that read the endpoint lists get fewer
but working entries.
