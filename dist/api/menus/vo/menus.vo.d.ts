import { MethodEnum } from '@src/enums/method.enum';
export declare class MenusVo {
    id: number;
    title: string;
    url: string;
    method: MethodEnum;
    icon: string;
    sort: number;
    resourcesType: number;
    parentId: number;
    status: number;
}
export declare class ApiVo {
    id: number;
    title: string;
}
