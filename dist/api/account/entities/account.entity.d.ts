import { SharedEntity } from '@src/shared/entities/base.entity';
export declare class AccountEntity extends SharedEntity {
    username: string;
    password: string;
    nickname: string;
    info: string;
    avatar: string;
    gender: number;
    age: number;
    accountType: number;
    tenantId: number;
    parentId: number;
    departmentId: number;
    sort: number;
    status: number;
    lastLoginIp: string;
    lastLoginNation: string;
    lastLoginProvince: string;
    lastLoginCity: string;
    lastLoginDistrict: string;
    lastLoginAdcode: string;
    lastLoginDate: Date;
    salt: string;
}
