import { DepartmentEntity } from './entities/department.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { DepartmentDto } from './dto/department.dto';
import { ICurrentUserType } from '@src/decorators';
import { DepartmentPageVo, DepartmentVo, SimplenessDepartmentVo } from './vo/department.vo';
import { QueryDepartmentDto } from './dto/department.query';
export declare class DepartmentService {
    private readonly departmentRepository;
    constructor(departmentRepository: Repository<DepartmentEntity>);
    createDepartmentApi(req: DepartmentDto, currentUser: ICurrentUserType): Promise<string>;
    deleteDepartmentByIdApi(id: number): Promise<string>;
    modifyDepartmentStatusByIdApi(id: number): Promise<string>;
    modifyDepartmentByIdApi(id: number, req: DepartmentDto, currentUser: ICurrentUserType): Promise<string>;
    getDepartmentPageApi(queryOption: QueryDepartmentDto, currentUser: ICurrentUserType): Promise<DepartmentPageVo>;
    getDepartmentListApi(currentUser: ICurrentUserType): Promise<SimplenessDepartmentVo[]>;
    getDepartmentByIdApi(id: number): Promise<DepartmentVo | undefined>;
    batchDeleteDepartmentByIdListApi(idList: number[]): Promise<string>;
    batchModifyDepartmentStatusByIdApi(idList: number[]): Promise<string>;
    get queryDepartmentBuilder(): SelectQueryBuilder<DepartmentEntity>;
}
