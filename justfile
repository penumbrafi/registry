# Update registry info JSON files
run:
  cd tools/compiler && \
    RUST_LOG=penumbra_registry=debug cargo run

# Publish npm/ to npmjs.org as @penumbrafi/registry. Manual step: npm no
# longer accepts our token type from CI, so a maintainer runs this locally
# after merging the "Version Packages" PR (needs `npm login` with 2FA).
publish-npm:
    cd npm && pnpm install && pnpm build && pnpm changeset:publish

# Sign registry/chains/<chain>.json for zafu's live refresh (offline key, see tools/sign)
sign chain="penumbra-1":
    node tools/sign/sign.mjs {{chain}}

# Check signed/<chain>.json.sig against the compiled registry
verify chain="penumbra-1":
    node tools/sign/sign.mjs --verify {{chain}}
