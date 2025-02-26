export declare class TenantDto {
    name: string;
    username: string;
    mobile: string;
    expireTime: Date;
    provinceId: number;
    cityId: number;
    areaId: number;
    address: string;
    sort: number;
    description: string;
}
export declare class RechargeDto {
    tenantId: number;
    amount: number;
}
export declare class CreateDefaultAccountDto {
    username: string;
    tenantId: number;
    sort: number;
}
