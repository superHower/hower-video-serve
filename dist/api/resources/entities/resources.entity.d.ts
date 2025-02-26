import { MethodEnum } from '@src/enums/method.enum';
import { SharedEntity } from '@src/shared/entities/base.entity';
export declare class ResourcesEntity extends SharedEntity {
    title: string;
    url: string;
    method: MethodEnum;
    icon: string;
    resourcesType: number;
    parentId: number;
    sort: number;
    status: number;
    description: string;
}
