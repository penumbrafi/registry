# @penumbrafi/registry

## 13.1.1

### Patch Changes

- ba9918a: Order `numeraires` by `canonicalNumeraires` instead of by asset order.

  The compiler built the numeraire list by filtering all assets, so output order
  followed the asset list rather than the order the chain input declares. A client
  that takes the first numeraire as its default quote asset therefore got an
  arbitrary one. It now follows `canonicalNumeraires` directly, making
  `USDC.inj` the first numeraire on `penumbra-1` ahead of Noble USDC.

  Only `penumbra-1` changes; every testnet output is byte-identical.

- d73f94a: List the Rotko RPC as `rpc.penumbra.fi` rather than `penumbra.rotko.net`.

  Both names resolve to the same node (same address, moniker
  `penumbra-03.ct.rotko.net`), so this changes the published hostname only. The
  project-branded name does not tie the endpoint to an operator domain if the
  node moves.

## 13.1.0

### Minor Changes

- 848fb27: Add an optional `status` field to IBC connections. `Chain.status` is
  `'active' | 'expired' | undefined` and records whether a connection can
  currently carry a transfer; `'expired'` normally means the counterparty light
  client has expired. Clients can use it to hide or disable a channel instead of
  offering a withdrawal that will never arrive. The field is optional and purely
  additive, so consumers that ignore it are unaffected.
- 4ad0b4d: Add a `wallets` list to globals. `RegistryGlobals` now exposes
  `wallets: EntityMetadata[]`, populated from the new `wallets` array in
  `registry/globals.json`, so clients can present the wallet software that works
  with the chain the same way they already present RPCs and frontends. The field
  is optional in the JSON, so older registry data still parses (`wallets` is then
  an empty array).

### Patch Changes

- 848fb27: Refresh `globals.json` endpoints and promote `USDC.inj` to a numeraire.

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

## 13.0.0

### Major Changes

- Republish under the `@penumbrafi` scope and read the registry data from `raw.githubusercontent.com/penumbrafi/registry/main/registry`. Previously published as `@penumbra-labs/registry` up to and including 12.8.0; the API is unchanged.

> Published as `@penumbra-labs/registry` up to and including 12.8.0.

## 12.8.0

### Minor Changes

- Add an option to improve caching in NextJS environments.

## 12.7.2

### Patch Changes

- Remove Simply Staking RPC for downtime

## 12.7.1

### Patch Changes

- update channels for phobos-3 testnet

## 12.7.0

### Minor Changes

- rpc: add radiant commons to registry

## 12.6.1

### Patch Changes

- rename allETH, add dydx and injective

## 12.6.0

### Minor Changes

- a4e903b: Add Phobos3 bundled registry

## 12.5.1

### Patch Changes

- 0ca7bc4: Fix querying metadata by denom – should use `base` field instead of `denom`

## 12.5.0

### Minor Changes

- dfad8cd: Allow querying metadata by asset's denom

## 12.4.0

### Minor Changes

- bump registry and consume downstream deps

## 12.3.0

### Minor Changes

- f1feced: update testnet channels and rpc providers list

## 12.2.0

### Minor Changes

- 47cae42: update testnet channels and rpc providers list

## 12.1.3

### Patch Changes

- 40cd591: rpc: remove binary builders from registry

## 12.1.2

### Patch Changes

- fix protobuf pkg version

## 12.1.1

### Patch Changes

- adds coingecko ids to assets

## 12.1.0

### Minor Changes

- Add fallible tryGetMetadata method to registry
- 4a563c9: Add priority scores

## 12.0.1

### Patch Changes

- fb2bff8: add primary colors to all assets, add script for auto coloring
- 6bcb0a9: add primary hex colors for all assets on all chains
- a174c49: Add name and description fields to native Penumbra token in the registry
- adb6ee2: add rc to registry's frontend list
- a2db6c4: Updates the channels for penumbra testnet

## 12.0.0

### Major Changes

- Forward compatible Metadata deserialization

## 11.5.0

### Minor Changes

- Adding badge support for metadata

## 11.3.1

### Patch Changes

- bundle phobos-2 registry, missing from v11.3.0

## 11.3.0

### Minor Changes

- Bundling new phobos registries

## 11.2.0

### Minor Changes

- c9bf54c: Updating testnet chain id fallback logic

## 11.1.0

### Minor Changes

- Update to latest bundle

## 11.0.0

### Major Changes

- 2a74e30: New frontends data structure w/ images

### Patch Changes

- b195bd3: Add support for local devnet chain IDs

## 10.1.0

### Minor Changes

- add osmosis channel

## 10.0.0

### Major Changes

- Expose remote fetching methods

## 9.4.0

### Minor Changes

- Add penumbra-1 to registry list

### Patch Changes

- 779e2bc: Change validator name for Starling Cybernetics to "Starling Cybernetics"

## 9.3.0

### Minor Changes

- Clear out rpcs & frontends

## 9.2.0

### Minor Changes

- Save stakingAssetId as proto-compatible type

## 9.1.1

### Patch Changes

- Fix testnet-preview parsing

## 9.1.0

### Minor Changes

- b5726c2: Changed stakingAssetId type

## 9.0.0

### Major Changes

- Add stakingAssetId to globals

## 8.0.1

### Patch Changes

- Update testnet to new noble/osmosis ibc channels

## 8.0.0

### Major Changes

- New API for global rpcs & frontends

## 7.7.0

### Minor Changes

- Add frontends to registry

## 7.6.0

### Minor Changes

- Add wtest_eth, test_sat, utest_atom, utest_osmo

## 7.5.1

### Patch Changes

- Update noble/osmosis testnet channels

## 7.5.0

### Minor Changes

- New gm/gn icons

## 7.4.1

### Patch Changes

- Fix Penumbra Labs testnet validator denoms

## 7.4.0

### Minor Changes

- Add Starling Staking delegation token metadata

## 7.3.0

### Minor Changes

- Update noble channels

## 7.2.2

### Patch Changes

- update osmosis channel for deimos-8

## 7.2.1

### Patch Changes

- Update noble channelids

## 7.2.0

### Minor Changes

- Fix deimos-8 exports

## 7.1.0

### Minor Changes

- Support for deimos-8

## 7.0.0

### Major Changes

- Bundle registry in dist

## 6.0.0

### Major Changes

- Counterparty chain id added + renamed ibcChannel to channelId

## 5.2.0

### Minor Changes

- Update to latest ibc channels

## 5.1.0

### Minor Changes

- Get all assets

## 5.0.0

### Major Changes

- New registry class

## 4.1.0

### Minor Changes

- Added registry for testnet-preview

## 4.0.0

### Major Changes

- Added stakingAssetId and numeraires

## 3.0.0

### Major Changes

- Augmented and adapted ibc connections

## 2.0.0

### Major Changes

- Expose more interfaces + change method name

## 1.1.0

### Minor Changes

- Simplify registry to one fetch

## 1.0.0

### Major Changes

- Initial publish
