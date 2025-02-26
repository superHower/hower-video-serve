import { ICurrentUserType } from '@src/decorators';
import { RoleEntity } from '../role/entities/role.entity';
import { AccountRoleService } from './accountRole.service';
import { AccountRoleDto } from './dto/account.role.dto';
export declare class AccountRoleController {
    private readonly accountRoleService;
    constructor(accountRoleService: AccountRoleService);
    distributionRoleApi(req: AccountRoleDto): Promise<string>;
    getRoleByAccountIdApi(accountId: number): Promise<RoleEntity[]>;
    getAllRolesApi(status: number, currentInfo: ICurrentUserType): Promise<RoleEntity[]>;
}
