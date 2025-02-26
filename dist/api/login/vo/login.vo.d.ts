import { ResourcesEntity } from '@src/api/resources/entities/resources.entity';
export declare class LoginVo {
    readonly id: number;
    readonly username?: string;
    readonly accountType?: number;
    readonly token?: string;
    readonly refreshToken?: string;
    readonly sign: string;
}
export declare class LoginAccountVo {
    readonly id: number;
    readonly username: string;
    readonly tenantId: number;
    readonly accountType: number;
    readonly status: number;
    readonly password: string;
    readonly salt: string;
}
export declare class LoginTokenDataVo {
    readonly userInfo: LoginAccountVo;
    readonly sign: string;
    readonly authApi: Pick<ResourcesEntity, 'id' | 'title' | 'method' | 'resourcesType' | 'url'>[];
}
