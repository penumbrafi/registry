# Publishing `@penumbrafi/registry`

This repository has no server deployment: the Rust compiler in `tools/` and
the data under `registry/` are consumed either as raw files from GitHub or as
the npm package built from `npm/`.

## What changed for penumbrafi

* The npm package is `@penumbrafi/registry` (was `@penumbra-labs/registry`,
  last published at 12.8.0). `publishConfig.access` is `public`, which a
  scoped package needs or `npm publish` fails with a 402.
* `REGISTRY_BASE_URL` in `npm/src/github.ts` points at
  `https://raw.githubusercontent.com/penumbrafi/registry/main/registry`, so a
  client with no explicit base URL reads this repository's data.
* A `major` changeset ships the rename; the first push to `main` opens the
  usual "Version Packages" PR, and merging that publishes.
* `.github/workflows/npm-publish.yml` is otherwise unchanged, apart from
  pointing `pnpm/action-setup` at `npm/package.json` (this repo has no root
  `package.json`, so the action cannot find the `packageManager` pin on its
  own, and passing `version:` as well fails the other way) and adding the
  `contents`/`pull-requests` write permissions the changesets action needs.

The image URLs inside `input/**.json`, and therefore inside the generated
`registry/**.json`, now point at
`raw.githubusercontent.com/penumbrafi/registry/main/images/`, so the registry
data no longer depends on the unmaintained upstream repository.

## Secrets to create

| secret | where | value |
| --- | --- | --- |
| `NPM_TOKEN` | repository secret in `penumbrafi/registry` | an npm **automation** token for an account with publish rights on the `@penumbrafi` scope |

No environment is needed; publishing is not gated on `production`.

## One-time npm setup

The `@penumbrafi` npm scope must exist and the token's account must be a
member of it before the first publish:

```sh
npm login
npm org create penumbrafi          # if the scope does not exist yet
npm token create --read-only=false # paste the result into NPM_TOKEN
```

## Known unverified

* Whether the `@penumbrafi` npm scope exists and whether an `NPM_TOKEN` with
  publish rights on it is available — neither could be checked from here.
* Downstream consumers still depend on `@penumbra-labs/registry`
  (`penumbrafi/web` apps/veil and apps/minifront, and `penumbra-explorer`).
  They keep resolving the old package until they are bumped separately; that
  is deliberate, so this rename does not break their builds.

## The `rotko-release` branch

Consumers that install this repository straight from git
(`github:penumbrafi/registry#rotko-release`) get `main` plus two generated
artifacts:

* a root `package.json` shim, because a git install resolves the repository
  root and the package sources live in `npm/`;
* a committed `npm/dist`, because a git install has no build step.

Both are gitignored on `main`, so the branch is built rather than merged, and
it is force-updated. Nothing should ever be committed to it by hand.

`.github/workflows/rebuild-rotko-release.yml` does this on every push to `main`
and on `workflow_dispatch`. It needs `contents: write` and pushes with the
built-in `GITHUB_TOKEN`; no secret is required.

The shim's `version` is read from `npm/package.json`, so it tracks whatever the
changesets release PR has set. The shim deliberately keeps the package name
`@penumbra-labs/registry` — consumers pinning the branch import that name, and
renaming it there would break them independently of the npm rename.

### Manual fallback

If the workflow is unavailable, the same branch can be produced locally:

```sh
git fetch origin
git checkout -B rotko-release origin/main
git submodule update --init

cd npm && pnpm install && pnpm build && cd ..

# write the root shim; keep it identical to the one the workflow generates
node - <<'NODE'
const fs = require('fs');
const { version } = require('./npm/package.json');
// ...same object as in .github/workflows/rebuild-rotko-release.yml...
NODE

git add -f npm/dist package.json
git commit -m "rotko-release: rebuild shim + dist from main ($(node -p "require('./npm/package.json').version"))"
git push --force origin rotko-release
```
