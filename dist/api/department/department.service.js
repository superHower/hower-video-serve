"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentService = void 0;
const common_1 = require("@nestjs/common");
const department_entity_1 = require("./entities/department.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const axios_1 = require("axios");
const tenant_entity_1 = require("../tenant/entities/tenant.entity");
const enums_1 = require("../../enums");
const utils_1 = require("../../utils");
const account_type_enum_1 = require("../../enums/account.type.enum");
const account_entity_1 = require("../account/entities/account.entity");
let DepartmentService = class DepartmentService {
    constructor(departmentRepository) {
        this.departmentRepository = departmentRepository;
    }
    async createDepartmentApi(req, currentUser) {
        const { tenantId } = currentUser;
        const data = this.departmentRepository.create(Object.assign(Object.assign({}, req), { tenantId }));
        await this.departmentRepository.save(data);
        return '创建成功';
    }
    async deleteDepartmentByIdApi(id) {
        const departmentEntity = await this.departmentRepository.findOne({
            where: { parentId: id },
            select: ['id'],
        });
        if (departmentEntity === null || departmentEntity === void 0 ? void 0 : departmentEntity.id) {
            throw new common_1.HttpException('当前部门有子部门,不能直接删除', axios_1.HttpStatusCode.Ok);
        }
        const { affected } = await this.departmentRepository.softDelete(id);
        if (affected) {
            return '删除成功';
        }
        else {
            return '删除失败';
        }
    }
    async modifyDepartmentStatusByIdApi(id) {
        const departmentEntity = await this.departmentRepository.findOne({
            where: { id },
            select: ['status'],
        });
        if (!departmentEntity) {
            throw new common_1.HttpException('你传递的部门id错误', axios_1.HttpStatusCode.Ok);
        }
        const status = departmentEntity.status == enums_1.StatusEnum.FORBIDDEN ? enums_1.StatusEnum.NORMAL : enums_1.StatusEnum.FORBIDDEN;
        const { affected } = await this.departmentRepository.update(id, { status });
        if (affected) {
            return '修改成功';
        }
        else {
            return '修改失败';
        }
    }
    async modifyDepartmentByIdApi(id, req, currentUser) {
        const { tenantId } = currentUser;
        const departmentEntity = await this.departmentRepository.findOne({
            where: { tenantId, title: req.title },
            select: ['id'],
        });
        if ((departmentEntity === null || departmentEntity === void 0 ? void 0 : departmentEntity.id) && (departmentEntity === null || departmentEntity === void 0 ? void 0 : departmentEntity.id) != id) {
            throw new common_1.HttpException(`${req.title}可能存在`, axios_1.HttpStatusCode.Ok);
        }
        const { affected } = await this.departmentRepository.update(id, req);
        if (affected) {
            return '修改成功';
        }
        else {
            return '修改失败';
        }
    }
    async getDepartmentPageApi(queryOption, currentUser) {
        const { status, title, tenantId: queryTenantId, pageNumber = enums_1.PageEnum.PAGE_NUMBER, pageSize = enums_1.PageEnum.PAGE_SIZE, } = queryOption;
        const query = new Map();
        if (title) {
            query.set('title', (0, typeorm_2.ILike)(`%${title}%`));
        }
        if ([enums_1.StatusEnum.NORMAL, enums_1.StatusEnum.FORBIDDEN].includes(status)) {
            query.set('status', (0, typeorm_2.Equal)(status + ''));
        }
        const { accountType, id, tenantId } = currentUser;
        if (queryTenantId) {
            query.set('tenantId', (0, typeorm_2.Equal)(queryTenantId + ''));
        }
        else {
            if (accountType == account_type_enum_1.AccountTypeEnum.SUPER_ACCOUNT) {
                console.log('超管不需要');
            }
            else if (accountType == account_type_enum_1.AccountTypeEnum.PRIMARY_ACCOUNT) {
                query.set('tenantId', (0, typeorm_2.Equal)(tenantId + ''));
            }
            else if (accountType == account_type_enum_1.AccountTypeEnum.NORMAL_ACCOUNT) {
                query.set('parentId', (0, typeorm_2.Equal)(id + ''));
            }
        }
        const total = await this.departmentRepository
            .createQueryBuilder('department')
            .where((0, utils_1.mapToObj)(query))
            .getCount();
        const queryBuilder = this.queryDepartmentBuilder;
        const data = await queryBuilder
            .where((0, utils_1.mapToObj)(query))
            .orderBy({ id: 'DESC' })
            .offset((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .getRawMany();
        console.log(data, '????????????????');
        return {
            data,
            total,
            pageNumber,
            pageSize,
        };
    }
    async getDepartmentListApi(currentUser) {
        const { id, tenantId, accountType } = currentUser;
        const query = new Map();
        query.set('tenantId', (0, typeorm_2.Equal)(tenantId + ''));
        if (accountType == account_type_enum_1.AccountTypeEnum.SUPER_ACCOUNT) {
            query.set('parentId', (0, typeorm_2.In)([-1, id]));
        }
        else {
            query.set('parentId', (0, typeorm_2.Equal)(id + ''));
        }
        return await this.departmentRepository.find({
            where: (0, utils_1.mapToObj)(query),
            select: ['id', 'title', 'parentId'],
        });
    }
    async getDepartmentByIdApi(id) {
        return await this.queryDepartmentBuilder.where('department.id = :id', { id }).getRawOne();
    }
    async batchDeleteDepartmentByIdListApi(idList) {
        const departmentEntityList = await this.departmentRepository.find({
            where: { parentId: (0, typeorm_2.In)(idList) },
            select: ['parentId', 'id'],
        });
        if (departmentEntityList.length > 0) {
            throw new common_1.HttpException('当前部门有子部门,不能直接删除', axios_1.HttpStatusCode.Ok);
        }
        const departmentEntityList1 = await this.departmentRepository.find({
            where: { id: (0, typeorm_2.In)(idList) },
            select: ['parentId'],
        });
        if (departmentEntityList1.map((item) => item.parentId).includes(-1)) {
            throw new common_1.HttpException('当前部门有子部门,不能直接删除', axios_1.HttpStatusCode.Ok);
        }
        const { affected } = await this.departmentRepository.softDelete({ id: (0, typeorm_2.In)(idList) });
        if (affected) {
            return '删除成功';
        }
        else {
            return '删除失败';
        }
    }
    async batchModifyDepartmentStatusByIdApi(idList) {
        const departmentEntityList = await this.departmentRepository.find({ where: { id: (0, typeorm_2.In)(idList) }, select: ['status'] });
        const statusList = departmentEntityList.map((item) => item.status);
        if ([...new Set(statusList)].length > 1) {
            throw new common_1.HttpException('当前部门多个状态,不能批量操作', axios_1.HttpStatusCode.Ok);
        }
        const status = statusList[0] == enums_1.StatusEnum.FORBIDDEN ? enums_1.StatusEnum.NORMAL : enums_1.StatusEnum.FORBIDDEN;
        const { affected } = await this.departmentRepository.update({ id: (0, typeorm_2.In)(idList) }, { status });
        if (affected) {
            return '修改成功';
        }
        else {
            return '修改失败';
        }
    }
    get queryDepartmentBuilder() {
        return this.departmentRepository
            .createQueryBuilder('department')
            .select('department.id', 'id')
            .addSelect('department.title', 'title')
            .addSelect('department.mobile', 'mobile')
            .addSelect('department.email', 'email')
            .addSelect('department.accountId', 'accountId')
            .addSelect('department.tenantId', 'tenantId')
            .addSelect('department.parentId', 'parentId')
            .addSelect('department.sort', 'sort')
            .addSelect('department.status', 'status')
            .addSelect('department.createdAt', 'createdAt')
            .addSelect('department.updatedAt', 'updatedAt')
            .leftJoinAndMapOne('xx', (qb) => qb
            .select('department1.id', 'parentId')
            .addSelect('department1.title', 'parentTitle')
            .from(department_entity_1.DepartmentEntity, 'department1'), 'department1', 'department.parentId=department1.parentId')
            .leftJoinAndMapOne('xx', (qb) => qb
            .select('tenant.id', 'tenantId')
            .addSelect('tenant.name', 'tenantName')
            .from(tenant_entity_1.TenantEntity, 'tenant'), 'tenant', 'department.tenantId=tenant.tenantId')
            .leftJoinAndMapOne('xx', (qb) => qb
            .select('account.id', 'accountId')
            .addSelect('account.username', 'name')
            .from(account_entity_1.AccountEntity, 'account'), 'account', 'department.accountId=account.accountId');
    }
};
exports.DepartmentService = DepartmentService;
exports.DepartmentService = DepartmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(department_entity_1.DepartmentEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DepartmentService);
//# sourceMappingURL=department.service.js.map