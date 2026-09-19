---
'@penumbrafi/registry': patch
---

Order `numeraires` by `canonicalNumeraires` instead of by asset order.

The compiler built the numeraire list by filtering all assets, so output order
followed the asset list rather than the order the chain input declares. A client
that takes the first numeraire as its default quote asset therefore got an
arbitrary one. It now follows `canonicalNumeraires` directly, making
`USDC.inj` the first numeraire on `penumbra-1` ahead of Noble USDC.

Only `penumbra-1` changes; every testnet output is byte-identical.
