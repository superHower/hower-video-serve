import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@src/plugin/logger/logger.service';
import { RedisService } from '@src/plugin/redis/redis.service';
import { ToolsService } from '@src/plugin/tools/tools.service';
import { Repository } from 'typeorm';
import { AccountEntity } from '../account/entities/account.entity';
import { AccountRoleEntity } from '../accountRole/entities/account.role.entity';
import { ResourcesEntity } from '../resources/entities/resources.entity';
import { RoleResourcesEntity } from '../roleResources/entities/role.resources.entity';
import { LoginDto } from './dto/login.dto';
import { LoginVo } from './vo/login.vo';
export declare class LoginService {
    private readonly accountRepository;
    private readonly accountRoleRepository;
    private readonly roleResourcesRepository;
    private readonly resourcesRepository;
    private readonly toolsService;
    private readonly loggerService;
    private readonly redisService;
    private readonly configService;
    constructor(accountRepository: Repository<AccountEntity>, accountRoleRepository: Repository<AccountRoleEntity>, roleResourcesRepository: Repository<RoleResourcesEntity>, resourcesRepository: Repository<ResourcesEntity>, toolsService: ToolsService, loggerService: LoggerService, redisService: RedisService, configService: ConfigService);
    loginApi(req: LoginDto): Promise<LoginVo>;
    refreshTokenApi(token: string): Promise<LoginVo>;
    private get queryLoginBuilder();
    private generateToken;
}
