import { describe, expect, it } from 'vitest';
import { RegistryGlobals } from './globals';
import { JsonGlobals } from './json';

const testGlobals: JsonGlobals = {
  rpcs: [{ name: 'rpc1', images: [], url: 'http://rpc1.com' }],
  frontendsV2: [{ name: 'frontend1', images: [], url: 'http://example.com' }],
  frontends: ['frontend1', 'frontend2', 'frontend3'],
  wallets: [{ name: 'wallet1', images: [], url: 'http://wallet1.com' }],
  stakingAssetId: {
    inner: 'KeqcLzNx9qSH5+lcJHBB9KNW+YPrBk5dKzvPMiypahA=',
  },
};

describe('Globals', () => {
  it('versions correctly', async () => {
    const registry = new RegistryGlobals(testGlobals);
    const version = await registry.version();
    expect(version).toEqual('755da72576f4285b768b1f8faa681a8e645089885dc15fa4c09137e1dee69394');
  });
});
