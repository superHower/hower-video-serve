import { TenantEntity } from './entities/tenant.entity';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { CreateDefaultAccountDto, RechargeDto, TenantDto } from './dto/tenant.dto';
import { QueryTenantDto } from './dto/tenant.query';
import { TenantPageVo, TenantVo } from './vo/tenant.vo';
import { AccountEntity } from '../account/entities/account.entity';
import { ICurrentUserType } from '@src/decorators';
import { ToolsService } from '@src/plugin/tools/tools.service';
import { ConfigService } from '@nestjs/config';
export declare class TenantService {
    private readonly tenantRepository;
    private readonly accountRepository;
    private readonly toolsService;
    private readonly configService;
    private readonly dataSource;
    constructor(tenantRepository: Repository<TenantEntity>, accountRepository: Repository<AccountEntity>, toolsService: ToolsService, configService: ConfigService, dataSource: DataSource);
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
    get queryTenantBuilder(): SelectQueryBuilder<TenantEntity>;
}
