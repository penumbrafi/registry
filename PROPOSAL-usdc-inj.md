# Proposal: Adding USDC.inj (Injective USDC) to the Penumbra registry

Status: INVESTIGATION / PROPOSAL ONLY - no registry files are changed by this document.

## Background

Circle is deprecating USDC on Noble (new minting stops 2026-10-13, CCTP V1
bridge halts 2026-12-01, the Noble USDC contract pauses 2027-01-12). The USDC
rail is moving to Injective. Ecosystem naming: `USDC.n` = Noble USDC
(deprecated), `USDC.inj` = Injective USDC (new).

Part A of this work (separate) renames the display symbol of the existing
Noble-path asset `transfer/channel-2/uusdc` from `USDC` to `USDC.n` via the
Noble `symbolOverrides` block. This document is the forward-looking plan for the
`USDC.inj` replacement.

## How the compiler builds an IBC asset (mechanics that constrain this)

From `tools/compiler/src/processor.rs`:

- For each entry in `ibcConnections`, the compiler reads the counterparty
  chain's `assetlist.json` (local submodule at
  `tools/compiler/files/chain-registry/<dir>/assetlist.json`), and for every
  asset calls `transport_metadata_along_channel`, which prepends exactly ONE
  hop: `transfer/{channelId}/` to the base, display, and every denom unit.
  `channelId` here is Penumbra's own channel that receives from the counterparty
  (e.g. `channel-2` for Noble, so the Noble USDC base is
  `transfer/channel-2/uusdc`).
- `symbolOverrides` only rewrites the `symbol` field, keyed by the source
  asset's base denom on the counterparty chain. It does NOT change the base,
  and it cannot add hops.
- `penumbraAssetId` is DERIVED from the final base denom by the tooling. It is
  not authored by hand and does not depend on the symbol (verified: the Part A
  symbol rename left `penumbraAssetId` byte-identical).
- `nativeAssets` in the input is `Vec<Metadata>` and is copied verbatim into the
  output. This is the only slot that can carry a hand-authored, arbitrary base
  denom (including a multi-hop base).
- `priorityScoresByBase`, `ibcAssets[].coingeckoId`, and `badgesByBase` are all
  keyed by the final base denom and layered on afterwards.

Consequence: the single-hop `ibcConnections` + `symbolOverrides` path can ONLY
produce a `USDC.inj` asset if there is a DIRECT Penumbra<->Injective transfer
channel with a live relayer. Any packet-forward-middleware (PFM) route through
Osmosis or Neutron is TWO hops, which the compiler cannot synthesize; a PFM
asset must be hand-authored as a `nativeAssets` `Metadata` entry with the full
multi-hop base.

## Blocking fact: there is no Injective-native USDC in the registry snapshot

The pinned chain-registry submodule (commit `95aac93`, dated 2025-03-06 - about
18 months stale) contains exactly one "USDC" on Injective:

- `injective/assetlist.json` line 886: base
  `ibc/2CBC2EA121AE42563B08028466F37B600F2D7D4282342DE938283CC3FB2BC00E`,
  symbol `USDC`, whose trace is `transfer/channel-148/uusdc` with counterparty
  `noble / uusdc / channel-31`.

That is Noble USDC bridged onto Injective (Injective channel-148 from Noble
channel-31). It is NOT a Circle-native Injective USDC. Routing it to Penumbra
would re-import Noble USDC under a new name and defeat the purpose of the
migration.

Therefore the real `USDC.inj` denom on Injective (call it `<X>`) is NOT
knowable from these files. It must be supplied by the team once Circle/Injective
publish the native issuance, and the chain-registry submodule must be updated so
the Injective assetlist actually lists it. Until then, every base denom below is
a template with `<X>` unresolved. Do NOT guess `<X>`, and specifically do NOT
reuse the `ibc/2CBC...` denom.

## Route options and their EXACT Penumbra base denoms

Channel IDs below are taken only from real files:
`tools/compiler/files/chain-registry/_IBC/*.json` and the existing
`input/chains/penumbra-1.json`. None are invented. The denom convention is
dest-channel prefixing, consistent with the live `transfer/channel-2/uusdc`
(where `channel-2` is Penumbra's receiving channel from Noble).

### Option 0 - Direct Injective -> Penumbra (simplest, if the channel is live)

`input/chains/penumbra-1.json` already declares a direct connection:
Penumbra `channel-15` <-> Injective `channel-434`. It already yields live
assets (e.g. `transfer/channel-15/nUSDC` is in the compiled output today).

- Resulting Penumbra base: `transfer/channel-15/<X>`
- Registry work: a single `symbolOverrides` entry in the existing Injective
  block: `"<X>": "USDC.inj"`. No PFM, no compiler change, no hand-authored
  Metadata.
- Caveat: `<X>` must be an Injective-native denom with no IBC trace (a Circle
  factory/native denom). If `<X>` is itself an `ibc/...` denom, the compiler
  would naively emit `transfer/channel-15/ibc/HASH`, which is a WRONG denom (the
  real denom unwinds the inner trace) - a latent compiler bug, see below.
- Verification needed (cannot be done from files; Penumbra is halted): query the
  Injective LCD
  `/ibc/core/channel/v1/channels/channel-434/ports/transfer` for channel state
  (`STATE_OPEN`) and counterparty, and confirm a relayer is actively moving
  packets on channel-15 <-> channel-434.

### Option A - PFM via Osmosis (Injective -> Osmosis -> Penumbra)

- Hop 1 (Injective -> Osmosis), `_IBC/injective-osmosis.json`:
  Injective `channel-8` -> Osmosis `channel-122` (status live, preferred).
- Hop 2 (Osmosis -> Penumbra), `_IBC/osmosis-penumbra.json`:
  Osmosis `channel-79703` -> Penumbra `channel-4` (status live, preferred).
- PFM forward memo on Osmosis targets Osmosis `channel-79703`.
- Resulting Penumbra base: `transfer/channel-4/transfer/channel-122/<X>`

Note: the working-tree input currently has an UNVERIFIED, uncommitted edit
changing the Osmosis block to Penumbra `channel-17` / counterparty
`channel-110473`. Both the committed registry and `_IBC/osmosis-penumbra.json`
say Penumbra `channel-4` / Osmosis `channel-79703`. This proposal uses the
`_IBC`/committed value `channel-4`. The channel-17 discrepancy must be resolved
on-chain before relying on it; if channel-17 is in fact the live channel, the
base becomes `transfer/channel-17/transfer/channel-122/<X>`.

### Option B - PFM via Neutron (Injective -> Neutron -> Penumbra)

- Hop 1 (Injective -> Neutron), `_IBC/injective-neutron.json`:
  Injective `channel-177` -> Neutron `channel-60` (status live, preferred).
- Hop 2 (Neutron -> Penumbra), `_IBC/neutron-penumbra.json`:
  Neutron `channel-4886` -> Penumbra `channel-6` (status live, preferred).
- Resulting Penumbra base: `transfer/channel-6/transfer/channel-60/<X>`

Conflict to resolve: the input's Neutron block says Penumbra `channel-9` /
counterparty `channel-6560`, while `_IBC/neutron-penumbra.json` says Penumbra
`channel-6` / Neutron `channel-4886`. These are different channel pairs. Which
one carries a live relayer must be confirmed on-chain. If `channel-9` is the
live Penumbra<->Neutron channel, the base becomes
`transfer/channel-9/transfer/channel-60/<X>`.

## Registry entries required (per route)

### If Option 0 (direct) and `<X>` is trace-free

1. Add `"<X>": "USDC.inj"` to `symbolOverrides` in the Injective block of
   `input/chains/penumbra-1.json`.
2. Optionally add `{ "base": "transfer/channel-15/<X>", "coingeckoId": "usd-coin" }`
   to `ibcAssets`.
3. Optionally add a `priorityScoresByBase` entry for
   `transfer/channel-15/<X>` (mirror the Noble USDC score if it is to become the
   numeraire), and optionally rotate `canonicalNumeraires`.
4. Requires the chain-registry submodule to be updated so Injective's
   `assetlist.json` actually contains `<X>`.

### If Option A or B (PFM, two hops)

The compiler cannot synthesize a two-hop asset from `ibcConnections`. It must be
hand-authored:

1. Add a full `Metadata` object to `nativeAssets` in
   `input/chains/penumbra-1.json` with:
   - `base`: the exact multi-hop denom for the chosen route (e.g.
     `transfer/channel-4/transfer/channel-122/<X>`), and matching `denomUnits`
     and `display`.
   - `symbol`: `USDC.inj`, plus `name`, `description`, `images`.
   - Do NOT hand-write `penumbraAssetId`; it is derived from the base denom.
2. Add the `ibcAssets` coingeckoId, `priorityScoresByBase`, and optional
   `badgesByBase` entries keyed by that same multi-hop base.

## Latent compiler bug to fix before any `ibc/...`-sourced route

`transport_metadata_along_channel` blindly prefixes `transfer/{channel}/` to the
source base. If the source asset's base is an `ibc/HASH` denom (as the current
Injective "USDC" is), the emitted base `transfer/channel-15/ibc/HASH` is not the
real on-chain denom - the correct denom unwinds the inner trace
(`transfer/channel-15/transfer/channel-148/uusdc` for that example). The
compiler has no unwinding logic (the output today contains zero
`transfer/.../ibc/...` and zero `transfer/.../transfer/...` bases, so there is no
precedent). This must be handled before routing any asset whose Injective base
is itself an IBC denom.

## Prerequisites (all must hold before funds can flow)

1. A genuine Injective-native `USDC.inj` denom `<X>` exists and is published in
   the cosmos chain-registry Injective assetlist; the submodule here is bumped
   to include it.
2. A live relayer on the chosen route:
   - Option 0: Penumbra `channel-15` <-> Injective `channel-434`.
   - Option A: Injective `channel-8` <-> Osmosis `channel-122` AND Osmosis
     `channel-79703` <-> Penumbra `channel-4`, with PFM enabled on Osmosis.
   - Option B: Injective `channel-177` <-> Neutron `channel-60` AND Neutron
     `channel-4886` <-> Penumbra `channel-6` (or `channel-9`), with PFM enabled
     on Neutron.
3. Penumbra is un-halted. Penumbra halted 2026-09-02. During a multi-week halt,
   counterparty light clients tracking Penumbra likely expire; recovery is a
   client substitution via governance or a fresh connection+channel. A NEW
   channel would change every base denom above (the channel ID is part of the
   denom), so all three denom templates are contingent on the CURRENT channels
   surviving the halt.
4. On-chain resolution of the two channel-pair conflicts flagged above
   (Osmosis channel-4 vs channel-17; Neutron channel-6 vs channel-9) before any
   PFM route is relied upon.

## Recommendation

Prefer Option 0 (direct channel-15) if and only if verification shows the
channel-15 <-> channel-434 relayer is live and a trace-free Injective-native
`USDC.inj` denom exists - it needs only a one-line `symbolOverrides` entry and
no compiler change. Otherwise a PFM route (Option A via Osmosis is the more
established DEX path) requires a hand-authored `nativeAssets` Metadata plus the
`ibc/...` unwinding fix. No registry change should be made until `<X>` is real
and the route relayer is confirmed on-chain.
