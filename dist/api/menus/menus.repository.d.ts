import { ICurrentUserType } from '@src/decorators';
import { Repository } from 'typeorm';
import { AccountRoleEntity } from '../accountRole/entities/account.role.entity';
import { ResourcesEntity } from '../resources/entities/resources.entity';
import { RoleResourcesEntity } from '../roleResources/entities/role.resources.entity';
export declare class MenusRepository {
    private readonly accountRoleRepository;
    private readonly roleResourcesRepository;
    private readonly resourcesRepository;
    constructor(accountRoleRepository: Repository<AccountRoleEntity>, roleResourcesRepository: Repository<RoleResourcesEntity>, resourcesRepository: Repository<ResourcesEntity>);
    getResourcesIdList(userInfo: ICurrentUserType, type: number): Promise<number[]>;
}
