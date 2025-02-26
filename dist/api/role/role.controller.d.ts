import { ICurrentUserType } from '@src/decorators';
import { RoleDto } from './dto/role.dto';
import { QueryRoleDto } from './dto/role.query';
import { RoleService } from './role.service';
import { RolePageVo, RoleVo } from './vo/role.vo';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    createRoleApi(req: RoleDto, currentInfo: ICurrentUserType): Promise<string>;
    deleteRoleByIdApi(id: number): Promise<string>;
    modifyRoleStatusByIdApi(id: number): Promise<string>;
    modifyRoleByIdApi(id: number, req: RoleDto): Promise<string>;
    getRolePageApi(queryOption: QueryRoleDto, currentInfo: ICurrentUserType): Promise<RolePageVo>;
    getRoleByIdApi(id: number): Promise<RoleVo | undefined>;
    batchDeleteRoleByIdListApi(idList: number[]): Promise<string>;
    batchModifyRoleStatusByIdApi(idList: number[]): Promise<string>;
}
