import { SharedEntity } from '@src/shared/entities/base.entity';
export declare class RoleEntity extends SharedEntity {
    name: string;
    description: string;
    status: number;
    sort: number;
    tenantId: number;
    accountId: number;
}
