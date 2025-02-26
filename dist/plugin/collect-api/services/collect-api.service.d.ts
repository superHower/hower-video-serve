import { Logger } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { IPermission } from '../types/collect.api';
export declare class CollectApiService {
    private readonly discoveryService;
    private readonly metadataScanner;
    private readonly reflector;
    logger: Logger;
    constructor(discoveryService: DiscoveryService, metadataScanner: MetadataScanner, reflector: Reflector);
    allPermissionList(): Promise<IPermission[] | undefined>;
    private collectPermission;
}
