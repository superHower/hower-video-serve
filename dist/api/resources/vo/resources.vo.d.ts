import { QueryListVo } from '@src/shared/vo/query.list.vo';
import { QueryVo } from '@src/shared/vo/query.vo';
export declare class ResourcesVo extends QueryVo {
    readonly title: string;
    readonly url: string;
    readonly icon: string;
    readonly sort: number;
    readonly resourcesType: number;
    readonly parentId: number;
    readonly status: number;
    readonly hasChildren?: boolean;
}
export declare class ResourcesListVo extends QueryListVo {
    readonly data: ResourcesVo[];
}
export declare class SimplenessResourceVo {
    readonly id: number;
    readonly title: string;
    readonly parentId: number;
    readonly resourcesType: number;
}
