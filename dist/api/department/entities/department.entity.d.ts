import { SharedEntity } from '@src/shared/entities/base.entity';
export declare class DepartmentEntity extends SharedEntity {
    title: string;
    accountId: number;
    mobile: string;
    email: string;
    description: string;
    status: number;
    sort: number;
    tenantId: number;
    parentId: number;
}
