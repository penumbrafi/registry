# Update registry info JSON files
run:
  cd tools/compiler && \
    RUST_LOG=penumbra_registry=debug cargo run

# Publish npm/ to npmjs.org as @penumbrafi/registry. Manual step: npm no
# longer accepts our token type from CI, so a maintainer runs this locally
# after merging the "Version Packages" PR (needs `npm login` with 2FA).
publish-npm:
    cd npm && pnpm install && pnpm build && pnpm changeset:publish
