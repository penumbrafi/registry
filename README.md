# Penumbra Chain Registry

This repository is the community-maintained registry of chain and asset metadata for
Penumbra. It is a continuation of the registry formerly published from
`prax-wallet/registry`, which is no longer maintained; this repository is where changes
land now, and it is open to anyone building on Penumbra.

Penumbra records value in its shielded pool tagged by _asset ID_, and client software must
map asset IDs to a `Metadata` object describing the base denom, display units, symbol,
asset icons, and so on. Because this information is presented to users to help them
understand what they are signing, it is relatively security-critical. As in the rest of the
Cosmos ecosystem, client software is responsible for choosing how to display asset
metadata; this repository is the shared compilation of those choices, so that every wallet,
explorer and frontend can show the same thing.

Generated output lives in [`registry/`](registry) and is what consumers read. It is
produced by the Rust compiler in [`tools/compiler`](tools/compiler) from the
human-edited files in [`input/`](input) plus the
[Cosmos chain registry](https://github.com/cosmos/chain-registry) submodule. **Never edit
`registry/` by hand** — CI regenerates it and fails on any difference.

## Consuming the registry

### From git (no build step)

The `rotko-release` branch is `main` plus a root `package.json` shim and a prebuilt,
committed `npm/dist`, so a package manager can install this repository directly:

```jsonc
{
  "dependencies": {
    "@penumbra-labs/registry": "github:penumbrafi/registry#rotko-release"
  }
}
```

The branch keeps the package name `@penumbra-labs/registry` so existing imports and
`@penumbra-zone/*` peer ranges resolve unchanged. It is regenerated automatically on every
push to `main` by
[`.github/workflows/rebuild-rotko-release.yml`](.github/workflows/rebuild-rotko-release.yml)
and is force-updated, so pin a commit if you need a fixed version, and never commit to it
by hand.

### From npm

The package is being republished as `@penumbrafi/registry`. Until the first release is out,
use the git branch above. See [`deploy/README.md`](deploy/README.md) for the publishing
setup.

### As raw JSON

Clients with no JavaScript dependency can read the generated files directly:

```
https://raw.githubusercontent.com/penumbrafi/registry/main/registry/globals.json
https://raw.githubusercontent.com/penumbrafi/registry/main/registry/chains/penumbra-1.json
```

This is the same base URL the npm package defaults to.

## Contributing

Every change follows the same path: **edit `input/`, run the generator, open a PR with both
the input and the regenerated output.**

1. Install the prerequisites: [Rust](https://www.rust-lang.org/tools/install) and
   [pnpm](https://pnpm.io/installation).
2. Fork and clone with submodules: `git clone --recurse-submodules`. If you have cloned
   before, refresh the Cosmos registry with `git submodule update --remote`.
3. Edit the relevant file under `input/` (see below).
4. Run the generator: `just run`, or `cd tools/compiler && cargo run`. It needs network
   access, because it fetches the images referenced by the metadata to derive theme
   colours.
5. If the change affects the npm package's behaviour, add a changeset: in `npm/`, run
   `pnpm install` and `pnpm changeset` — `minor` for a new chain or a new field, `patch` for
   an asset addition or edit.
6. Commit **both** `input/` and the regenerated `registry/`, and open a PR.

### Adding or updating an IBC connection

Edit the `ibcConnections` array in `input/chains/<chain-id>.json`. An entry looks like:

```jsonc
{
  "displayName": "Noble",
  "chainId": "noble-1",
  "channelId": "channel-2", // the channel on Penumbra
  "counterpartyChannelId": "channel-89", // the channel on the counterparty chain
  "status": "active", // "active" or "expired"; omit if unclassified
  "addressPrefix": "noble",
  "cosmosRegistryDir": "noble", // directory name in the Cosmos chain registry
  "images": [{ "png": "…", "svg": "…" }],
  "symbolOverrides": { "<base denom>": "<symbol>" }
}
```

The compiler reads the counterparty chain's asset list from the Cosmos chain registry
submodule and derives the metadata for each asset as it appears on Penumbra, prefixing
denoms with `transfer/<channelId>/`.

`status` records whether the connection can currently carry a transfer. A connection whose
counterparty light client has expired should be marked `"expired"` so wallets can hide or
disable it instead of offering a withdrawal that will never arrive. The field is optional
and additive: clients that do not know about it are unaffected.

Note that changing a channel is not just a one-line edit — every `transfer/channel-N/...`
key in `ibcAssets`, `priorityScoresByBase`, `canonicalNumeraires` and `badgesByBase` refers
to a specific channel and has to move with it.

### Adding or updating an asset

- **A native Penumbra asset**: add it to `nativeAssets` in `input/chains/<chain-id>.json`.
- **An asset arriving over IBC**: it is derived automatically from the Cosmos chain
  registry. Add an entry to `ibcAssets` to attach a `coingeckoId`, and use
  `symbolOverrides` on the connection if the symbol collides with another asset already in
  the registry.
- **Display priority**: `priorityScoresByBase` orders assets in client UIs; higher sorts
  first.
- **Images**: add the file to [`images/`](images) and reference it as
  `https://raw.githubusercontent.com/penumbrafi/registry/main/images/<file>`.

### Adding an RPC, frontend or wallet

Edit `input/globals.json` — `rpcs`, `frontendsV2` and `wallets` are each a list of
`{ name, url, images }` — then run the generator. Listing is not an endorsement; entries
that stop resolving get removed.

## CI

Every PR runs:

- **Rust CI** (`rust-checks.yml`): `cargo fmt --check`, `cargo clippy --tests -D warnings`,
  `cargo test`, and a **generate-and-diff** job that runs the compiler and fails if the
  committed `registry/` output differs from what the compiler produces. If that job fails,
  you forgot to commit the regenerated output — run the generator and commit the result.
- **TypeScript CI** (`typescript-check.yml`): eslint, prettier, `pnpm build` and `vitest`
  in `npm/`.

On merge to `main`, `rebuild-rotko-release.yml` regenerates the `rotko-release` branch, and
`npm-publish.yml` maintains the changesets release PR (it skips itself when no npm token is
configured).

### File structure

```
input/                  # human-edited source of truth
├── globals.json        # rpcs, frontends, wallets
└── chains/
    └── <chain-id>.json # one file per chain, named by chain ID
registry/               # generated output — do not edit
images/                 # images referenced by the metadata
npm/                    # the TypeScript client package
tools/compiler/         # the Rust generator
```

### Why not just use the Cosmos chain registry?

We do, indirectly. The Cosmos chain registry describes assets on Cosmos chains. Penumbra
clients need data about assets _on Penumbra_, including Penumbra-specific data such as the
Penumbra asset ID, and the metadata an asset takes on once it has been transported along a
particular channel. This repository is that view.

## Publishing

npm rejects CI publishes with our token type (2FA / granular-token rules), so publishing is manual:

1. Merge the changesets **Version Packages** PR (CI keeps it up to date on every push to `main`).
2. On `main`, run `just publish-npm` — this runs `changeset publish` in `npm/` with your own `npm login` session and pushes the release tag.

Consumers can also pin the git branch `rotko-release` or read the raw JSON; see above.
