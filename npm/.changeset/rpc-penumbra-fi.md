---
'@penumbrafi/registry': patch
---

List the Rotko RPC as `rpc.penumbra.fi` rather than `penumbra.rotko.net`.

Both names resolve to the same node (same address, moniker
`penumbra-03.ct.rotko.net`), so this changes the published hostname only. The
project-branded name does not tie the endpoint to an operator domain if the
node moves.
