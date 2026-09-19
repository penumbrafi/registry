import { AssetId } from '@penumbra-zone/protobuf/penumbra/core/asset/v1/asset_pb';
import { Denom } from '@penumbra-zone/protobuf/penumbra/core/asset/v1/asset_pb';
import { Metadata } from '@penumbra-zone/protobuf/penumbra/core/asset/v1/asset_pb';

export declare type Base64AssetId = Stringified<AssetId['inner']>;

declare class BundledClient {
    get(chainId: string): Registry;
    globals(): RegistryGlobals;
}

export declare interface Chain {
    addressPrefix: string;
    chainId: string;
    channelId: string;
    counterpartyChannelId: string;
    images: Image_2[];
    displayName: string;
    /**
     * Liveness of the connection as last observed on chain. `'expired'` means the
     * channel cannot currently carry a transfer, usually because the counterparty
     * light client has expired, and clients should hide or disable it. Absent when
     * the connection has not been classified.
     */
    status?: ConnectionStatus;
}

export declare class ChainRegistryClient {
    readonly bundled: BundledClient;
    readonly remote: RemoteClient;
    constructor(options?: RegistryOptions);
}

export declare type ConnectionStatus = 'active' | 'expired';

declare interface DenomUnit {
    denom: string;
    exponent?: number;
}

export declare interface EntityMetadata {
    name: string;
    url: string;
    images: Image_2[];
}

declare interface Image_2 {
    png?: string;
    svg?: string;
}
export { Image_2 as Image }

declare interface Image_3 {
    png?: string;
    svg?: string;
    theme?: {
        primaryColorHex?: string;
        circle?: boolean;
        darkMode?: boolean;
    };
}

export declare const isDenom: (value?: Denom | AssetId) => value is Denom;

declare interface JsonGlobals {
    rpcs: EntityMetadata[];
    /** @deprecated use `frontendsV2` instead */
    frontends: string[];
    frontendsV2: EntityMetadata[];
    /** Absent from registry data generated before wallets were tracked. */
    wallets?: EntityMetadata[];
    stakingAssetId: {
        inner: string;
    };
}

declare interface JsonMetadata {
    description?: string;
    denomUnits: DenomUnit[];
    base: string;
    display: string;
    name?: string;
    symbol: string;
    penumbraAssetId: PenumbraAssetId;
    images?: Image_3[];
    badges?: Image_3[];
}

declare interface JsonRegistry {
    chainId: string;
    ibcConnections: Chain[];
    assetById: Record<Base64AssetId, JsonMetadata>;
    numeraires: Base64AssetId[];
}

declare interface PenumbraAssetId {
    inner: string;
}

export declare class Registry {
    readonly chainId: string;
    readonly ibcConnections: Chain[];
    readonly numeraires: AssetId[];
    private readonly assetById;
    private readonly assetByDenom;
    constructor(r: JsonRegistry);
    private _resolveMetadata;
    getMetadata(id: AssetId | Denom): Metadata;
    tryGetMetadata(id: AssetId | Denom): Metadata | undefined;
    getAllAssets(): Metadata[];
    version(): Promise<string>;
}

declare class RegistryGlobals {
    readonly stakingAssetId: AssetId;
    readonly rpcs: EntityMetadata[];
    readonly frontends: EntityMetadata[];
    readonly wallets: EntityMetadata[];
    constructor(json: JsonGlobals);
    version(): Promise<string>;
}

/** Options to configure the registry.
 *
 * In the browser, no tinkering should be needed.
 *
 * If you're using NextJS, you should consider adding the `nextjsServerSide` flag,
 * when on the server.
 */
declare interface RegistryOptions {
    /** If set, this code is running on the server side of a NextJS app.
     *
     * This information is useful, because NextJS overrides the behavior of the
     * `fetch` API, which the registry uses to get an up-to-date remote registry.
     *
     * We want to cache these results, which `fetch` will do just fine in the browser.
     * But, by default, NextJS will not cache anything, ever.
     * By informing the registry that it's running in this environment, it can amend
     * its fetching behavior accordingly.
     */
    nextjsServerSide?: boolean;
}

declare class RemoteClient {
    private readonly bundled;
    private readonly github;
    constructor(bundled: BundledClient, options?: RegistryOptions);
    get(chainId: string): Promise<Registry>;
    getWithBundledBackup(chainId: string): Promise<Registry>;
    globals(): Promise<RegistryGlobals>;
}

declare type Stringified<T> = string;

export { }
