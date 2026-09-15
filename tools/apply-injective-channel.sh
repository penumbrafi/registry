#!/usr/bin/env bash
#
# Substitute the real penumbra-1 <-> injective-1 IBC channel ids into the
# registry input and regenerate the registry.
#
# Usage:
#   tools/apply-injective-channel.sh <penumbra-channel> <injective-channel>
#
# Example, once the relayer has opened the channel:
#   tools/apply-injective-channel.sh channel-18 channel-512
#
# The input file carries the placeholders <PENUMBRA_CHANNEL_ID> and
# <INJECTIVE_CHANNEL_ID>. Every Injective asset id on Penumbra is derived from
# the IBC denom path "transfer/<penumbra-channel>/<base denom>", so the
# penumbra-side channel id has to be substituted before the compiler runs; the
# ids it produced for channel-15 are all invalid on the new channel.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
INPUT="$REPO_ROOT/input/chains/penumbra-1.json"

PEN_PLACEHOLDER='<PENUMBRA_CHANNEL_ID>'
INJ_PLACEHOLDER='<INJECTIVE_CHANNEL_ID>'

die() { echo "error: $*" >&2; exit 1; }

[ $# -eq 2 ] || die "usage: $(basename "$0") <penumbra-channel> <injective-channel>"

PEN_CHANNEL="$1"
INJ_CHANNEL="$2"

for c in "$PEN_CHANNEL" "$INJ_CHANNEL"; do
  [[ "$c" =~ ^channel-[0-9]+$ ]] || die "'$c' is not a channel id (expected channel-<n>)"
done

[ -f "$INPUT" ] || die "input file not found: $INPUT"

grep -qF "$PEN_PLACEHOLDER" "$INPUT" \
  || die "no $PEN_PLACEHOLDER left in $INPUT — the channel ids were already applied (git checkout the file to start over)"
grep -qF "$INJ_PLACEHOLDER" "$INPUT" \
  || die "no $INJ_PLACEHOLDER left in $INPUT — the channel ids were already applied (git checkout the file to start over)"

# Refuse to collide with a channel id already claimed by another connection.
if grep -q "\"channelId\": \"$PEN_CHANNEL\"" "$INPUT"; then
  die "$PEN_CHANNEL is already used by another ibcConnection in $INPUT"
fi

echo "==> substituting $PEN_PLACEHOLDER => $PEN_CHANNEL, $INJ_PLACEHOLDER => $INJ_CHANNEL"
sed -i \
  -e "s|$PEN_PLACEHOLDER|$PEN_CHANNEL|g" \
  -e "s|$INJ_PLACEHOLDER|$INJ_CHANNEL|g" \
  "$INPUT"

python3 -c "import json,sys; json.load(open(sys.argv[1]))" "$INPUT" \
  || die "$INPUT is not valid JSON after substitution"

echo "==> submodule check"
if [ ! -f "$REPO_ROOT/tools/compiler/files/chain-registry/injective/assetlist.json" ]; then
  echo "    cosmos/chain-registry submodule missing, initialising"
  git -C "$REPO_ROOT" submodule update --init --depth 1
fi

echo "==> running the compiler (regenerates registry/ for every chain)"
if command -v just >/dev/null 2>&1; then
  ( cd "$REPO_ROOT" && just run )
else
  ( cd "$REPO_ROOT/tools/compiler" && RUST_LOG=penumbra_registry=debug cargo run )
fi

OUT="$REPO_ROOT/registry/chains/penumbra-1.json"

echo "==> verifying output"
grep -qF "$PEN_PLACEHOLDER" "$OUT" && die "placeholder leaked into $OUT"
grep -qF "transfer/channel-15/" "$OUT" && die "stale channel-15 Injective assets still present in $OUT"

python3 - "$OUT" "$PEN_CHANNEL" <<'PY'
import json, sys
out, chan = sys.argv[1], sys.argv[2]
reg = json.load(open(out))
conns = [c for c in reg["ibcConnections"] if c["chainId"] == "injective-1"]
assert len(conns) == 1, f"expected exactly one injective-1 connection, found {len(conns)}"
assert conns[0]["channelId"] == chan, conns[0]["channelId"]

prefix = f"transfer/{chan}/"
assets = {m["symbol"]: m for m in reg["assetById"].values() if m["base"].startswith(prefix)}
print(f"{len(assets)} Injective assets on {chan}")

wanted = {
    "USDC.inj": prefix + "erc20:0xa00C59fF5a080D2b954d0c75e46E22a0c371235a",
    "AUSD": prefix + "factory/inj1n636d9gzrqggdk66n2f97th0x8yuhfrtx520e7/ausd",
    "USDT": prefix + "peggy0xdAC17F958D2ee523a2206206994597C13D831ec7",
    "INJ": prefix + "inj",
}
missing = [s for s, b in wanted.items() if s not in assets or assets[s]["base"] != b]
assert not missing, f"missing/mismatched priority assets: {missing}"

for sym in wanted:
    m = assets[sym]
    # the ibcAssets / priorityScoresByBase keys are channel-scoped too, so a
    # missed substitution shows up here as a dropped coingecko id or score
    assert m.get("coingeckoId"), f"{sym}: coingeckoId did not propagate"
    assert m.get("priorityScore"), f"{sym}: priorityScore did not propagate"
    print(f"  {sym:9} {m['penumbraAssetId']['inner']}  {m['base']}"
          f"  cg={m['coingeckoId']} prio={m['priorityScore']}")
PY

echo "==> done. Review 'git diff' (input/ + registry/), then commit."
