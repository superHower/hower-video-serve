import { QueryListVo } from '@src/shared/vo/query.list.vo';
import { QueryVo } from '@src/shared/vo/query.vo';
export declare class AccountVo extends QueryVo {
    readonly username: string;
    readonly accountType: number;
    readonly nickname: string;
    readonly avatar: string;
    readonly info: string;
    readonly gender: number;
    readonly age: number;
    readonly parentId: number;
    readonly parentName: number;
    readonly sort: number;
    readonly status: number;
}
export declare class AccountPageVo extends QueryListVo {
    readonly data: AccountVo[];
}
