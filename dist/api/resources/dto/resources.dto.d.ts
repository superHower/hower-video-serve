import { MethodEnum } from '@src/enums/method.enum';
export declare class ResourcesDto {
    title: string;
    url: string;
    method: MethodEnum;
    icon: string;
    sort: number;
    resourcesType: number;
    parentId: number;
}
