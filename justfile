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

# Upload the signed registry to https://registry.zafu.pro/ (verifies first)
publish-live chain="penumbra-1" host="root@web.rotko.net":
    node tools/sign/sign.mjs --verify {{chain}}
    scp registry/chains/{{chain}}.json signed/{{chain}}.json.sig {{host}}:/opt/zafu-registry/
    ssh {{host}} 'chown deploy:deploy /opt/zafu-registry/{{chain}}.json /opt/zafu-registry/{{chain}}.json.sig'
