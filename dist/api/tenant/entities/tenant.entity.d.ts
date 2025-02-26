import { SharedEntity } from '@src/shared/entities/base.entity';
export declare class TenantEntity extends SharedEntity {
    name: string;
    username: string;
    mobile: string;
    balance: number;
    expireTime: Date;
    status: number;
    provinceId: number;
    cityId: number;
    areaId: number;
    address: string;
    sort: number;
    description: string;
}
