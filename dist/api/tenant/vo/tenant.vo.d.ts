import { QueryListVo } from '@src/shared/vo/query.list.vo';
import { QueryVo } from '@src/shared/vo/query.vo';
export declare class TenantVo extends QueryVo {
    readonly name: string;
    readonly username: string;
    readonly mobile: string;
    readonly balance: number;
    readonly expireTime: Date;
    readonly status: number;
    readonly provinceId: number;
    readonly provinceName: string;
    readonly cityId: number;
    readonly cityName: string;
    readonly areaId: number;
    readonly areaName: string;
    readonly address: string;
    readonly sort: number;
    readonly description: string;
    readonly accountTotal?: number;
}
export declare class TenantPageVo extends QueryListVo {
    readonly data: TenantVo[];
}
