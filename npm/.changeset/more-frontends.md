---
'@penumbrafi/registry': patch
---

Add `penumbra.fi` (veil DEX) to the frontend lists, and point the Zafu wallet
entry at `zafu.pro`.

Removing the dead endpoints had left a single frontend. `penumbra.fi` serves
the same veil instance as `dex.rotko.net` (byte-identical), so only the
project-branded hostname is listed. The Zafu `wallets` entry pointed at
`zafu.rotko.net`, which redirects to `zafu.pro`; it now names the destination
directly.

`penumbra.bryanlabs.net/app` was checked and excluded: it answers
`application/grpc`, so it is the gRPC endpoint rather than an app.
