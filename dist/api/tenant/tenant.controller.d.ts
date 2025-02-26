import { ICurrentUserType } from '@src/decorators';
import { CreateDefaultAccountDto, RechargeDto, TenantDto } from './dto/tenant.dto';
import { QueryTenantDto } from './dto/tenant.query';
import { TenantService } from './tenant.service';
import { TenantPageVo, TenantVo } from './vo/tenant.vo';
export declare class TenantController {
    private readonly tenantService;
    constructor(tenantService: TenantService);
    createTenantApi(req: TenantDto): Promise<string>;
    deleteTenantByIdApi(id: number, currentUser: ICurrentUserType): Promise<string>;
    modifyTenantStatusByIdApi(id: number, currentUser: ICurrentUserType): Promise<string>;
    modifyTenantByIdApi(id: number, req: TenantDto): Promise<string>;
    getTenantPageApi(queryOption: QueryTenantDto): Promise<TenantPageVo>;
    getTenantByIdApi(id: number): Promise<TenantVo | undefined>;
    batchDeleteTenantByIdListApi(idList: number[], currentUser: ICurrentUserType): Promise<string>;
    batchModifyTenantStatusByIdApi(idList: number[], currentUser: ICurrentUserType): Promise<string>;
    rechargeTenantApi(req: RechargeDto): Promise<string>;
    createDefaultAccount(req: CreateDefaultAccountDto): Promise<string>;
}
