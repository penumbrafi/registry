---
'@penumbrafi/registry': patch
---

Add `dex.rotko.net` (veil) and `zafu.pro` (Zafu wallet) to the frontend lists.

Both verified serving. The frontend list had been reduced to a single entry
after the dead endpoints were removed; these are the other Penumbra frontends
found to be live. `penumbra.bryanlabs.net/app` was checked and excluded: it
answers `application/grpc`, so it is the gRPC endpoint rather than an app.
