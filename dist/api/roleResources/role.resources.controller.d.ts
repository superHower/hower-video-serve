import { ResourcesEntity } from '../resources/entities/resources.entity';
import { RoleResourcesDto } from './dto/role.resources.dto';
import { RoleResourcesService } from './role.resources.service';
export declare class RoleResourcesController {
    private readonly roleResourcesService;
    constructor(roleResourcesService: RoleResourcesService);
    dispatchResourcesApi(req: RoleResourcesDto): Promise<string>;
    getResourceByRoleIdApi(roleId: number, type: number): Promise<ResourcesEntity[]>;
}
