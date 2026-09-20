---
'@penumbrafi/registry': patch
---

Expand the frontend lists and point the Zafu wallet entry at `zafu.pro`.

Every pd gRPC endpoint also serves the frontend at the same address: the root
returns a single-page app whose router handles `/app` client-side (requesting
`/app` from the server returns `application/grpc`, so the route only resolves in
a browser). The ghostinnet, Validatus and Bryanlabs RPC hosts all serve the
identical bundle, so they are now listed as frontends as well as RPCs.

Also adds `penumbra.fi`, which serves the same veil instance as
`dex.rotko.net` (byte-identical), listed under the project-branded hostname.

The Zafu `wallets` entry pointed at `zafu.rotko.net`, which redirects to
`zafu.pro`; it now names the destination directly. Zafu is a wallet, so it stays
in `wallets` alongside Prax rather than in the frontend lists.
