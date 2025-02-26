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
exports.AccountService = void 0;
const common_1 = require("@nestjs/common");
const account_entity_1 = require("./entities/account.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tools_service_1 = require("../../plugin/tools/tools.service");
const account_type_enum_1 = require("../../enums/account.type.enum");
const enums_1 = require("../../enums");
const utils_1 = require("../../utils");
const tenant_entity_1 = require("../tenant/entities/tenant.entity");
const department_entity_1 = require("../department/entities/department.entity");
let AccountService = class AccountService {
    constructor(accountRepository, toolsService) {
        this.accountRepository = accountRepository;
        this.toolsService = toolsService;
    }
    async createAccountApi(req) {
        console.log('进来了------------------》》', req);
        const accountEntity = await this.accountRepository.findOne({
            where: { username: req.username },
            select: ['id'],
        });
        if (accountEntity === null || accountEntity === void 0 ? void 0 : accountEntity.id) {
            throw new common_1.HttpException(`[${req.username}]可能已经存在,请先检查`, common_1.HttpStatus.OK);
        }
        const salt = this.toolsService.getRandomSalt;
        const password = this.toolsService.makePassword(req.password, salt);
        const data = this.accountRepository.create({
            username: req.username,
            accountType: req.accountType,
            sort: req.sort,
            password: password,
            tenantId: 1,
            parentId: 1,
            salt: salt,
            lastLoginDate: new Date(),
            departmentId: req.departmentId,
        });
        await this.accountRepository.save(data);
        return '创建成功';
    }
    async deleteAccountByIdApi(id, currentUser) {
        const { id: accountId } = currentUser;
        if (Object.is(id, accountId)) {
            throw new common_1.HttpException('自己不能删除自己', common_1.HttpStatus.OK);
        }
        const accountEntity = await this.accountRepository.findOne({
            where: { parentId: id },
            select: ['id'],
        });
        if (accountEntity === null || accountEntity === void 0 ? void 0 : accountEntity.id) {
            throw new common_1.HttpException('下面有子账号不能直接删除', common_1.HttpStatus.OK);
        }
        const accountEntity1 = await this.accountRepository.findOne({ where: { id }, select: ['accountType'] });
        if (accountEntity1 && accountEntity1.accountType == account_type_enum_1.AccountTypeEnum.SUPER_ACCOUNT) {
            throw new common_1.HttpException('超管不能被删除', common_1.HttpStatus.OK);
        }
        const { affected } = await this.accountRepository.softDelete(id);
        if (affected) {
            return '删除成功';
        }
        else {
            return '删除失败';
        }
    }
    async modifyAccountStatusByIdApi(id, currentUser) {
        const { id: accountId } = currentUser;
        if (Object.is(id, accountId)) {
            throw new common_1.HttpException('自己不能修改自己', common_1.HttpStatus.OK);
        }
        const accountEntity = await this.accountRepository.findOne({
            where: { id },
            select: ['status'],
        });
        if (!accountEntity) {
            throw new common_1.HttpException('传递的id错误', common_1.HttpStatus.OK);
        }
        const { affected } = await this.accountRepository.update(id, {
            status: (accountEntity === null || accountEntity === void 0 ? void 0 : accountEntity.status) == enums_1.StatusEnum.FORBIDDEN ? enums_1.StatusEnum.NORMAL : enums_1.StatusEnum.FORBIDDEN,
        });
        if (affected) {
            return '修改成功';
        }
        else {
            return '修改失败';
        }
    }
    async modifyAccountByIdApi(id, req) {
        const accountEntity = await this.accountRepository.findOne({
            where: { username: req.username },
            select: ['id'],
        });
        if (accountEntity && accountEntity.id != id) {
            throw new common_1.HttpException(`[${req.username}]可能已经存在`, common_1.HttpStatus.OK);
        }
        const { affected } = await this.accountRepository.update(id, req);
        if (affected) {
            return '修改成功';
        }
        else {
            return '修改失败';
        }
    }
    async getAccountPageApi(queryOption, currentInfo) {
        const { status, username, pageNumber = enums_1.PageEnum.PAGE_NUMBER, pageSize = enums_1.PageEnum.PAGE_SIZE, } = queryOption;
        const query = new Map();
        if (username) {
            query.set('username', (0, typeorm_2.ILike)(`%${username}%`));
        }
        if ([enums_1.StatusEnum.NORMAL, enums_1.StatusEnum.FORBIDDEN].includes(status)) {
            query.set('status', (0, typeorm_2.Equal)(status + ''));
        }
        const { id } = currentInfo;
        query.set('parentId', (0, typeorm_2.Equal)(id + ''));
        const total = await this.accountRepository
            .createQueryBuilder('account')
            .where([(0, utils_1.mapToObj)(query), { id: id }])
            .getCount();
        const queryBuilder = this.queryAccountBuilder;
        const data = await queryBuilder
            .where([(0, utils_1.mapToObj)(query), { id: id }])
            .orderBy({ accountType: 'DESC', id: 'DESC' })
            .offset((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .getRawMany();
        return {
            data,
            total,
            pageNumber,
            pageSize,
        };
    }
    async getAccountListApi(currentInfo, status) {
        const { id, accountType } = currentInfo;
        console.log(status, '状态', id, accountType);
        const query = new Map();
        if (Object.is(accountType, account_type_enum_1.AccountTypeEnum.SUPER_ACCOUNT)) {
            query.set('parentId', (0, typeorm_2.In)([-1, id]));
        }
        else {
            query.set('parentId', (0, typeorm_2.Equal)(id + ''));
        }
        if ([enums_1.StatusEnum.FORBIDDEN, enums_1.StatusEnum.NORMAL].includes(status)) {
            query.set('status', (0, typeorm_2.Equal)(status + ''));
        }
        const accountEntity = await this.accountRepository.find({
            where: (0, utils_1.mapToObj)(query),
            select: ['id', 'username', 'parentId'],
        });
        return accountEntity;
    }
    async getAccountByIdApi(id) {
        return await this.queryAccountBuilder.where('account.id = :id', { id }).getRawOne();
    }
    async batchDeleteAccountByIdListApi(idList, currentUser) {
        const { id: accountId } = currentUser;
        if (idList.includes(accountId)) {
            throw new common_1.HttpException('自己不能删除自己', common_1.HttpStatus.OK);
        }
        const accountEntityList = await this.accountRepository.find({
            where: { parentId: (0, typeorm_2.In)(idList) },
            select: ['id'],
        });
        if (accountEntityList.length) {
            throw new common_1.HttpException('下面有子账号不能直接删除', common_1.HttpStatus.OK);
        }
        const accountEntityList1 = await this.accountRepository.find({ where: { id: (0, typeorm_2.In)(idList) }, select: ['accountType'] });
        if (accountEntityList1.length &&
            accountEntityList1
                .map((item) => item.accountType)
                .some((item) => item == account_type_enum_1.AccountTypeEnum.SUPER_ACCOUNT)) {
            throw new common_1.HttpException('超管不能被删除', common_1.HttpStatus.OK);
        }
        const { affected } = await this.accountRepository.softDelete(idList);
        if (affected) {
            return '删除成功';
        }
        else {
            return '删除失败';
        }
    }
    async batchModifyAccountStatusByIdApi(idList, currentUser) {
        const { id: accountId } = currentUser;
        console.log(idList, accountId, '????==============');
        if (idList.includes(accountId)) {
            throw new common_1.HttpException('自己不能修改自己', common_1.HttpStatus.OK);
        }
        const accountEntityList = await this.accountRepository.find({
            where: { id: (0, typeorm_2.In)(idList) },
            select: ['status'],
        });
        const statusList = accountEntityList.map((item) => item.status);
        if ([...new Set(statusList)].length > 1) {
            throw new common_1.HttpException('当前传递的数据状态不统一,不能批量操作', common_1.HttpStatus.OK);
        }
        const { affected } = await this.accountRepository.update(idList, {
            status: statusList[0] == enums_1.StatusEnum.FORBIDDEN ? enums_1.StatusEnum.NORMAL : enums_1.StatusEnum.FORBIDDEN,
        });
        if (affected) {
            return '修改成功';
        }
        else {
            return '修改失败';
        }
    }
    get queryAccountBuilder() {
        return this.accountRepository
            .createQueryBuilder('account')
            .select('account.id', 'id')
            .addSelect('account.username', 'username')
            .addSelect('account.accountType', 'accountType')
            .addSelect('account.tenantId', 'tenantId')
            .addSelect('account.parentId', 'parentId')
            .addSelect('account.departmentId', 'departmentId')
            .addSelect('account.sort', 'sort')
            .addSelect('account.status', 'status')
            .addSelect('account.lastLoginIp', 'lastLoginIp')
            .addSelect('account.lastLoginNation', 'lastLoginNation')
            .addSelect('account.lastLoginProvince', 'lastLoginProvince')
            .addSelect('account.lastLoginCity', 'lastLoginCity')
            .addSelect('account.lastLoginDistrict', 'lastLoginDistrict')
            .addSelect('account.lastLoginAdcode', 'lastLoginAdcode')
            .addSelect('account.lastLoginDate', 'lastLoginDate')
            .addSelect('account.createdAt', 'createdAt')
            .addSelect('account.updatedAt', 'updatedAt')
            .leftJoinAndMapOne('xx', (qb) => qb
            .select('account1.id', 'parentId')
            .addSelect('account1.username', 'parentName')
            .from(account_entity_1.AccountEntity, 'account1'), 'account1', 'account.parentId=account1.parentId')
            .leftJoinAndMapOne('xx', (qb) => qb
            .select('tenant.id', 'tenantId')
            .addSelect('tenant.name', 'tenantName')
            .from(tenant_entity_1.TenantEntity, 'tenant'), 'tenant', 'account.tenantId=tenant.tenantId')
            .leftJoinAndMapOne('xx', (qb) => qb
            .select('department.id', 'departmentId')
            .addSelect('department.title', 'departmentTitle')
            .from(department_entity_1.DepartmentEntity, 'department'), 'department', 'account.departmentId=department.departmentId');
    }
};
exports.AccountService = AccountService;
exports.AccountService = AccountService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(account_entity_1.AccountEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        tools_service_1.ToolsService])
], AccountService);
//# sourceMappingURL=account.service.js.map