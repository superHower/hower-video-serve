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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const role_entity_1 = require("./entities/role.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const enums_1 = require("../../enums");
const utils_1 = require("../../utils");
const account_entity_1 = require("../account/entities/account.entity");
const tenant_entity_1 = require("../tenant/entities/tenant.entity");
let RoleService = class RoleService {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async createRoleApi(req, currentInfo) {
        const { id, tenantId } = currentInfo;
        const roleEntity = await this.roleRepository.findOne({
            where: { name: req.name, accountId: id },
            select: ['id'],
        });
        if (roleEntity === null || roleEntity === void 0 ? void 0 : roleEntity.id) {
            throw new common_1.HttpException(`[${req.name}]可能已经存在`, common_1.HttpStatus.OK);
        }
        const roleData = this.roleRepository.create({
            name: req.name,
            tenantId,
            accountId: id,
            sort: req.sort,
            description: req.description,
        });
        await this.roleRepository.save(roleData);
        return '创建成功';
    }
    async deleteRoleByIdApi(id) {
        const { affected } = await this.roleRepository.softDelete(id);
        return affected ? '删除成功' : '删除失败';
    }
    async modifyRoleStatusByIdApi(id) {
        const roleEntity = await this.roleRepository.findOne({
            where: { id },
            select: ['status'],
        });
        if (!roleEntity) {
            throw new common_1.HttpException('传递的id错误', common_1.HttpStatus.OK);
        }
        const { affected } = await this.roleRepository.update(id, {
            status: (roleEntity === null || roleEntity === void 0 ? void 0 : roleEntity.status) == enums_1.StatusEnum.FORBIDDEN ? enums_1.StatusEnum.NORMAL : enums_1.StatusEnum.FORBIDDEN,
        });
        if (affected) {
            return '修改成功';
        }
        else {
            return '修改失败';
        }
    }
    async modifyRoleByIdApi(id, req) {
        const roleEntity = await this.roleRepository.findOne({
            where: { name: req.name },
            select: ['id'],
        });
        if (roleEntity && roleEntity.id != id) {
            throw new common_1.HttpException(`[${req.name}]可能重复`, common_1.HttpStatus.OK);
        }
        const { affected } = await this.roleRepository.update(id, req);
        if (affected) {
            return '修改成功';
        }
        else {
            return '修改失败';
        }
    }
    async batchDeleteRoleByIdListApi(idList) {
        const { affected } = await this.roleRepository.softDelete(idList);
        if (affected) {
            return '删除成功';
        }
        else {
            return '删除失败';
        }
    }
    async batchModifyRoleStatusByIdApi(idList) {
        const roleEntityList = await this.roleRepository.find({
            where: { id: (0, typeorm_2.In)(idList) },
            select: ['status'],
        });
        const statusList = roleEntityList.map((item) => item.status);
        if ([...new Set(statusList)].length > 1) {
            throw new common_1.HttpException('当前传递的数据状态不统一,不能批量操作', common_1.HttpStatus.OK);
        }
        const { affected } = await this.roleRepository.update(idList, {
            status: statusList[0] == enums_1.StatusEnum.FORBIDDEN ? enums_1.StatusEnum.NORMAL : enums_1.StatusEnum.FORBIDDEN,
        });
        return affected ? '修改成功' : '修改失败';
    }
    async getRoleByIdApi(id) {
        return await this.queryRoleBuilder.where('role.id = :id', { id }).getRawOne();
    }
    async getRolePageApi(queryOption, currentInfo) {
        const { name, status, pageNumber = enums_1.PageEnum.PAGE_NUMBER, pageSize = enums_1.PageEnum.PAGE_SIZE, } = queryOption;
        const { id } = currentInfo;
        const query = new Map();
        if (name) {
            query.set('name', (0, typeorm_2.ILike)(`%${name}%`));
        }
        if (status >= 0) {
            query.set('status', (0, typeorm_2.Equal)(status + ''));
        }
        query.set('accountId', (0, typeorm_2.Equal)(id + ''));
        const queryBuilder = this.queryRoleBuilder;
        const data = await queryBuilder
            .where((0, utils_1.mapToObj)(query))
            .orderBy({ id: 'DESC' })
            .offset((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .printSql()
            .getRawMany();
        const total = await this.roleRepository
            .createQueryBuilder('role')
            .where((0, utils_1.mapToObj)(query))
            .getCount();
        return {
            data,
            total,
            pageNumber,
            pageSize,
        };
    }
    get queryRoleBuilder() {
        return this.roleRepository
            .createQueryBuilder('role')
            .select('role.id', 'id')
            .addSelect('role.name', 'name')
            .addSelect('role.accountId', 'accountId')
            .addSelect('role.tenantId', 'tenantId')
            .addSelect('role.status', 'status')
            .addSelect('role.sort', 'sort')
            .addSelect('role.description', 'description')
            .addSelect('role.createdAt', 'createdAt')
            .addSelect('role.updatedAt', 'updatedAt')
            .leftJoinAndMapOne('xx', (qb) => qb
            .select('account.id', 'accountId')
            .addSelect('account.username', 'accountUsername')
            .from(account_entity_1.AccountEntity, 'account'), 'account', 'role.accountId=account.accountId')
            .leftJoinAndMapOne('xx', (qb) => qb
            .select('tenant.id', 'tenantId')
            .addSelect('tenant.name', 'tenantName')
            .from(tenant_entity_1.TenantEntity, 'tenant'), 'tenant', 'role.tenantId=tenant.tenantId');
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.RoleEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RoleService);
//# sourceMappingURL=role.service.js.map