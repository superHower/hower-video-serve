import { QueryListVo } from '@src/shared/vo/query.list.vo';
import { QueryVo } from '@src/shared/vo/query.vo';
export declare class DepartmentVo extends QueryVo {
    readonly title: string;
    readonly accountId: number;
    readonly name: string;
    readonly mobile: string;
    readonly email: string;
    readonly description: string;
    readonly status: number;
    readonly sort: number;
    readonly tenantId: number;
    readonly tenantName: string;
    readonly parentId: number | string;
    readonly parentTitle: string;
}
export declare class DepartmentPageVo extends QueryListVo {
    readonly data: DepartmentVo[];
}
export declare class SimplenessDepartmentVo {
    readonly id: number;
    readonly title: string;
    readonly parentId: number;
}
