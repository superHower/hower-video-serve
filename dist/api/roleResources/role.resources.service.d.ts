import { DataSource, Repository } from 'typeorm';
import { ResourcesEntity } from '../resources/entities/resources.entity';
import { RoleResourcesDto } from './dto/role.resources.dto';
import { RoleResourcesEntity } from './entities/role.resources.entity';
export declare class RoleResourcesService {
    private readonly roleResourcesRepository;
    private readonly resourcesRepository;
    private dataSource;
    constructor(roleResourcesRepository: Repository<RoleResourcesEntity>, resourcesRepository: Repository<ResourcesEntity>, dataSource: DataSource);
    dispatchResourcesApi(req: RoleResourcesDto): Promise<string>;
    getResourceByRoleIdApi(roleId: number, type: number): Promise<ResourcesEntity[]>;
}
