import { AccountRoleEntity } from './entities/account.role.entity';
import { DataSource, Repository } from 'typeorm';
import { RoleEntity } from '../role/entities/role.entity';
import { AccountRoleDto } from './dto/account.role.dto';
import { ICurrentUserType } from '@src/decorators';
export declare class AccountRoleService {
    private readonly accountRoleRepository;
    private readonly roleRepository;
    private dataSource;
    constructor(accountRoleRepository: Repository<AccountRoleEntity>, roleRepository: Repository<RoleEntity>, dataSource: DataSource);
    distributionRoleApi(req: AccountRoleDto): Promise<string>;
    getRoleByAccountIdApi(accountId: number): Promise<RoleEntity[]>;
    getAllRolesApi(status: number, currentInfo: ICurrentUserType): Promise<RoleEntity[]>;
}
