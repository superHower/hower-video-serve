import { QueryListVo } from '@src/shared/vo/query.list.vo';
import { QueryVo } from '@src/shared/vo/query.vo';
export declare class RoleVo extends QueryVo {
    readonly name: string;
    readonly description: string;
    readonly status: number;
    readonly sort: number;
    readonly tenantId: number;
    readonly tenantName: string;
    readonly accountId: number;
    readonly accountUsername: string;
}
export declare class RolePageVo extends QueryListVo {
    readonly data: RoleVo[];
}
