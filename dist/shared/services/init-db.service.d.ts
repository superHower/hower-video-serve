import { ConfigService } from '@nestjs/config';
import { AccountEntity } from '@src/api/account/entities/account.entity';
import { TenantEntity } from '@src/api/tenant/entities/tenant.entity';
import { Repository } from 'typeorm';
import { ToolsService } from '@src/plugin/tools/tools.service';
export declare class InitDbService {
    private readonly accountRepository;
    private readonly tenantRepository;
    private readonly configService;
    private readonly toolsService;
    constructor(accountRepository: Repository<AccountEntity>, tenantRepository: Repository<TenantEntity>, configService: ConfigService, toolsService: ToolsService);
    onModuleInit(): void;
    private initData;
}
