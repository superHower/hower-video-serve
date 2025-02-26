import { QueryListVo } from '@src/shared/vo/query.list.vo';
import { QueryVo } from '@src/shared/vo/query.vo';
export declare class AccountVo extends QueryVo {
    readonly username: string;
    readonly accountType: number;
    readonly tenantId: number;
    readonly tenantName: string;
    readonly parentId: number;
    readonly parentName: number;
    readonly departmentId: number;
    readonly departmentTitle: string;
    readonly sort: number;
    readonly status: number;
    readonly lastLoginIp: string;
    readonly lastLoginNation: string;
    readonly lastLoginProvince: string;
    readonly lastLoginCity: string;
    readonly lastLoginDistrict: string;
    readonly lastLoginAdcode: string;
    readonly lastLoginDate: Date;
}
export declare class AccountPageVo extends QueryListVo {
    readonly data: AccountVo[];
}
