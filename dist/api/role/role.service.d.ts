import { RoleEntity } from './entities/role.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ICurrentUserType } from '@src/decorators';
import { RoleDto } from './dto/role.dto';
import { RolePageVo, RoleVo } from './vo/role.vo';
import { QueryRoleDto } from './dto/role.query';
export declare class RoleService {
    private readonly roleRepository;
    constructor(roleRepository: Repository<RoleEntity>);
    createRoleApi(req: RoleDto, currentInfo: ICurrentUserType): Promise<string>;
    deleteRoleByIdApi(id: number): Promise<string>;
    modifyRoleStatusByIdApi(id: number): Promise<string>;
    modifyRoleByIdApi(id: number, req: RoleDto): Promise<string>;
    batchDeleteRoleByIdListApi(idList: number[]): Promise<string>;
    batchModifyRoleStatusByIdApi(idList: number[]): Promise<string>;
    getRoleByIdApi(id: number): Promise<RoleVo | undefined>;
    getRolePageApi(queryOption: QueryRoleDto, currentInfo: ICurrentUserType): Promise<RolePageVo>;
    get queryRoleBuilder(): SelectQueryBuilder<RoleEntity>;
}
