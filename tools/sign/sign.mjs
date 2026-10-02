#!/usr/bin/env node
// Signs a compiled chain registry for wallets that fetch it live (zafu).
//
//   node tools/sign/sign.mjs [chainId]          sign registry/chains/<chainId>.json
//   node tools/sign/sign.mjs --verify [chainId] check signed/<chainId>.json.sig
//
// The signature covers the file's exact bytes (by sha256) and the npm package
// version, so a wallet can refuse an older copy that was validly signed once.
// The ed25519 key is age-encrypted; it is decrypted into this process only.

import { createHash, createPrivateKey, createPublicKey, sign, verify } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const args = process.argv.slice(2);
const verifyOnly = args[0] === '--verify';
const chainId = args.filter(a => !a.startsWith('--'))[0] ?? 'penumbra-1';

const FORMAT = 'penumbrafi-registry-sig/1';
// the zafu-embedded public key; a signature by any other key is refused
const PUBLIC_KEY = 'EHH46McQdpD1M6LVrvk7MbzvCIF6QNXFiqWi3Z0GPcM=';

/** the signed message: everything a wallet checks, one field per line */
export const message = ({ chainId, version, sha256 }) =>
  Buffer.from(`${FORMAT}\n${chainId}\n${version}\n${sha256}\n`);

const publicKey = createPublicKey({
  key: Buffer.concat([
    Buffer.from('302a300506032b6570032100', 'hex'), // spki prefix for a raw ed25519 key
    Buffer.from(PUBLIC_KEY, 'base64'),
  ]),
  format: 'der',
  type: 'spki',
});

const bytes = readFileSync(join(root, 'registry/chains', `${chainId}.json`));
const sha256 = createHash('sha256').update(bytes).digest('hex');
const sigPath = join(root, 'signed', `${chainId}.json.sig`);

if (verifyOnly) {
  const sig = JSON.parse(readFileSync(sigPath, 'utf8'));
  const ok =
    sig.format === FORMAT &&
    sig.chainId === chainId &&
    sig.sha256 === sha256 &&
    verify(null, message(sig), publicKey, Buffer.from(sig.signature, 'base64'));
  console.log(ok ? `ok ${chainId} ${sig.version} ${sha256}` : `BAD signature for ${chainId}`);
  process.exit(ok ? 0 : 1);
}

const version = JSON.parse(readFileSync(join(root, 'npm/package.json'), 'utf8')).version;
const keyFile =
  process.env.REGISTRY_SIGNING_KEY ??
  join(homedir(), 'tommidata/secrets/penumbrafi-registry-signing.age');
const identity =
  process.env.REGISTRY_SIGNING_IDENTITY ?? join(homedir(), 'tommidata/secrets/.age-key');
const privateKey = createPrivateKey(
  execFileSync('age', ['-d', '-i', identity, keyFile], { stdio: ['inherit', 'pipe', 'inherit'] }),
);
if (createPublicKey(privateKey).export({ type: 'spki', format: 'der' }).subarray(12).toString('base64') !== PUBLIC_KEY) {
  console.error('that key is not the registry signing key');
  process.exit(1);
}

const fields = { format: FORMAT, chainId, version, sha256 };
const signature = sign(null, message(fields), privateKey).toString('base64');
mkdirSync(dirname(sigPath), { recursive: true });
writeFileSync(sigPath, `${JSON.stringify({ ...fields, signature }, null, 2)}\n`);
console.log(`signed ${chainId} ${version} ${sha256}`);
