---
'@penumbrafi/registry': minor
---

List the new Osmosis, Kava, Cosmos Hub and Celestia channels, and rename the legacy ones.

The old Cosmos Hub, Celestia and Osmosis channels expired when their counterparty light
clients lapsed and cannot be revived without a governance proposal on each counterparty
chain. Fresh channels were opened permissionlessly instead:

| chain      | penumbra   | counterparty   |
| ---------- | ---------- | -------------- |
| Osmosis    | channel-20 | channel-111093 |
| Kava       | channel-21 | channel-162    |
| Cosmos Hub | channel-22 | channel-1934   |
| Celestia   | channel-23 | channel-701    |

All four are verified end to end — deposit and withdrawal, relayed and acknowledged.

A new channel mints a new, non-fungible asset: `transfer/channel-20/uosmo` is a different
asset from `transfer/channel-4/uosmo`, and holders of the old one can still trade it on the
DEX even though its bridge is shut. Nothing is removed here. The old connections stay listed
as `expired`, which keeps them out of the deposit/withdraw UI while their assets keep their
metadata so balances and pools still render.

To tell the two apart, legacy assets are suffixed with their channel — `OSMO.ch4`,
`ATOM.ch0`, `TIA.ch3` — following the convention already used for `USDC.inj`, `axlETH.base`
and `wstETH.neutron`. The compiler enforces globally unique symbols, so every legacy asset
needs one, not only the ones that moved.

Assets with a non-zero priority score are re-keyed onto the live channels and inherit their
slots; the legacy copies are demoted so live assets sort first. Previously
`transfer/channel-4/uosmo` sat second overall despite its bridge being dead.

Kava is new rather than a replacement: 7.49M native Tether USDT, listed as `USDT.kava`.
