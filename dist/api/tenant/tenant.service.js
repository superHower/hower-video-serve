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
exports.TenantService = void 0;
const common_1 = require("@nestjs/common");
const tenant_entity_1 = require("./entities/tenant.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const enums_1 = require("../../enums");
const area_entity_1 = require("../area/entities/area.entity");
const utils_1 = require("../../utils");
const account_entity_1 = require("../account/entities/account.entity");
const tools_service_1 = require("../../plugin/tools/tools.service");
const config_1 = require("@nestjs/config");
const account_type_enum_1 = require("../../enums/account.type.enum");
let TenantService = class TenantService {
    constructor(tenantRepository, accountRepository, toolsService, configService, dataSource) {
        this.tenantRepository = tenantRepository;
        this.accountRepository = accountRepository;
        this.toolsService = toolsService;
        this.configService = configService;
        this.dataSource = dataSource;
    }
    async createTenantApi(req) {
        const tenantEntity = await this.tenantRepository.findOne({
            where: { name: req.name },
            select: ['id'],
        });
        if (tenantEntity === null || tenantEntity === void 0 ? void 0 : tenantEntity.id) {
            throw new common_1.HttpException(`${req.name}已经存在`, common_1.HttpStatus.OK);
        }
        const data = this.tenantRepository.create(req);
        await this.tenantRepository.save(data);
        return '创建成功';
    }
    async deleteTenantByIdApi(id, currentUser) {
        const { tenantId } = currentUser;
        if (tenantId == id) {
            throw new common_1.HttpException('自己不能删除自己', common_1.HttpStatus.OK);
        }
        const { affected } = await this.tenantRepository.softDelete(id);
        if (affected) {
            return '删除成功';
        }
        else {
            return '删除失败';
        }
    }
    async modifyTenantStatusByIdApi(id, currentUser) {
        const { tenantId } = currentUser;
        if (tenantId == id) {
            throw new common_1.HttpException('自己不能修改自己', common_1.HttpStatus.OK);
        }
        const tenantEntity = await this.tenantRepository.findOne({
            where: { id },
            select: ['status'],
        });
        if (!tenantEntity) {
            throw new common_1.HttpException('传递的id错误', common_1.HttpStatus.OK);
        }
        const { affected } = await this.tenantRepository.update(id, {
            status: (tenantEntity === null || tenantEntity === void 0 ? void 0 : tenantEntity.status) == enums_1.StatusEnum.FORBIDDEN ? enums_1.StatusEnum.NORMAL : enums_1.StatusEnum.FORBIDDEN,
        });
        if (affected) {
            return '修改成功';
        }
        else {
            return '修改失败';
        }
    }
    async modifyTenantByIdApi(id, req) {
        const tenantEntity = await this.tenantRepository.findOne({
            where: { name: req.name },
            select: ['id'],
        });
        if ((tenantEntity === null || tenantEntity === void 0 ? void 0 : tenantEntity.id) && (tenantEntity === null || tenantEntity === void 0 ? void 0 : tenantEntity.id) != id) {
            throw new common_1.HttpException(`${req.name}已经存在`, common_1.HttpStatus.OK);
        }
        const { affected } = await this.tenantRepository.update(id, req);
        if (affected) {
            return '修改成功';
        }
        else {
            return '修改失败';
        }
    }
    async getTenantPageApi(queryOption) {
        const { name, status, mobile, username, pageNumber = enums_1.PageEnum.PAGE_NUMBER, pageSize = enums_1.PageEnum.PAGE_SIZE, } = queryOption;
        const query = new Map();
        if (name) {
            query.set('name', (0, typeorm_2.ILike)(`%${name}%`));
        }
        if (mobile) {
            query.set('mobile', (0, typeorm_2.Equal)(mobile));
        }
        if (username) {
            query.set('username', (0, typeorm_2.ILike)(`%${username}%`));
        }
        if (status >= 0) {
            query.set('status', (0, typeorm_2.Equal)(status + ''));
        }
        const queryBuilder = this.queryTenantBuilder;
        const data = await queryBuilder
            .where((0, utils_1.mapToObj)(query))
            .orderBy({ id: 'DESC' })
            .offset((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .printSql()
            .getRawMany();
        const total = await this.tenantRepository
            .createQueryBuilder('tenant')
            .where((0, utils_1.mapToObj)(query))
            .getCount();
        const tenantIdList = data.map((item) => item.id);
        const accountTotalList = await this.accountRepository
            .createQueryBuilder('account')
            .select('account.tenantId', 'tenantId')
            .addSelect('count(*)', 'total')
            .where({ tenantId: (0, typeorm_2.In)(tenantIdList) })
            .groupBy('account.tenantId')
            .getRawMany();
        const accountTotalMap = new Map();
        for (const item of accountTotalList) {
            accountTotalMap.set(item.tenantId, item.total);
        }
        const resultData = [];
        for (const item of data) {
            resultData.push(Object.assign(Object.assign({}, item), { accountTotal: +accountTotalMap.get(item.id) }));
        }
        return {
            data: resultData,
            total,
            pageNumber,
            pageSize,
        };
    }
    async getTenantByIdApi(id) {
        const queryBuilder = this.queryTenantBuilder;
        return await queryBuilder.where('tenant.id = :id', { id }).getRawOne();
    }
    async batchDeleteTenantByIdListApi(idList, currentUser) {
        console.log(idList, '获取到的数据', currentUser);
        const { tenantId } = currentUser;
        console.log(tenantId, idList.includes(tenantId), '???');
        if (idList.includes(tenantId)) {
            throw new common_1.HttpException('自己不能删除自己', common_1.HttpStatus.OK);
        }
        const { affected } = await this.tenantRepository.softDelete(idList);
        if (affected) {
            return '删除成功';
        }
        else {
            return '删除成功';
        }
    }
    async batchModifyTenantStatusByIdApi(idList, currentUser) {
        var _a;
        const { tenantId } = currentUser;
        if (idList.includes(tenantId)) {
            throw new common_1.HttpException('自己不能修改自己', common_1.HttpStatus.OK);
        }
        const tenantEntityList = await this.tenantRepository.find({
            where: { id: (0, typeorm_2.In)(idList) },
            select: ['status'],
        });
        if ([...new Set(tenantEntityList.map((item) => item.status))].length > 1) {
            throw new common_1.HttpException('当前状态不统一,不能批量修改', common_1.HttpStatus.OK);
        }
        const { affected } = await this.tenantRepository.update(idList, {
            status: ((_a = tenantEntityList[0]) === null || _a === void 0 ? void 0 : _a.status) == enums_1.StatusEnum.FORBIDDEN
                ? enums_1.StatusEnum.NORMAL
                : enums_1.StatusEnum.FORBIDDEN,
        });
        if (affected) {
            return '修改成功';
        }
        else {
            return '修改失败';
        }
    }
    async rechargeTenantApi(req) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const { tenantId, amount } = req;
            const tenant = queryRunner.manager.increment(tenant_entity_1.TenantEntity, { id: (0, typeorm_2.Equal)(tenantId) }, 'balance', amount);
            console.log(tenant);
            await queryRunner.commitTransaction();
            return '创建成功';
        }
        catch (err) {
            console.log(err, '创建失败');
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException('创建失败', common_1.HttpStatus.OK);
        }
        finally {
            await queryRunner.release();
        }
    }
    async createDefaultAccount(req) {
        var _a;
        const accountEntity = await this.accountRepository.findOne({
            where: { username: req.username, tenantId: req.tenantId },
            select: ['id'],
        });
        if (accountEntity === null || accountEntity === void 0 ? void 0 : accountEntity.id) {
            throw new common_1.HttpException(`[${req.username}]可能已经存在,请先检查`, common_1.HttpStatus.OK);
        }
        const salt = this.toolsService.getRandomSalt;
        const defaultPassword = (_a = this.configService.get('defaultPassword')) !== null && _a !== void 0 ? _a : '123456';
        const password = this.toolsService.makePassword(defaultPassword, salt);
        const data = this.accountRepository.create({
            username: req.username,
            sort: req.sort,
            password: password,
            tenantId: req.tenantId,
            parentId: -1,
            salt: salt,
            accountType: account_type_enum_1.AccountTypeEnum.PRIMARY_ACCOUNT,
            lastLoginDate: new Date(),
        });
        await this.accountRepository.save(data);
        return '创建成功';
    }
    get queryTenantBuilder() {
        return this.tenantRepository
            .createQueryBuilder('tenant')
            .select('tenant.id', 'id')
            .addSelect('tenant.name', 'name')
            .addSelect('tenant.username', 'username')
            .addSelect('tenant.mobile', 'mobile')
            .addSelect('tenant.balance', 'balance')
            .addSelect('tenant.expireTime', 'expireTime')
            .addSelect('tenant.status', 'status')
            .addSelect('tenant.provinceId', 'provinceId')
            .addSelect('tenant.cityId', 'cityId')
            .addSelect('tenant.areaId', 'areaId')
            .addSelect('tenant.address', 'address')
            .addSelect('tenant.sort', 'sort')
            .addSelect('tenant.description', 'description')
            .addSelect('tenant.createdAt', 'createdAt')
            .addSelect('tenant.updatedAt', 'updatedAt')
            .leftJoinAndMapOne('xx', (qb) => qb
            .select('area.id', 'provinceId')
            .addSelect('area.name', 'provinceName')
            .from(area_entity_1.AreaEntity, 'area'), 'area', 'tenant.provinceId=area.provinceId')
            .leftJoinAndMapOne('xx', (qb) => qb
            .select('area1.id', 'cityId')
            .addSelect('area1.name', 'cityName')
            .from(area_entity_1.AreaEntity, 'area1'), 'area1', 'tenant.cityId=area1.cityId')
            .leftJoinAndMapOne('xx', (qb) => qb
            .select('area2.id', 'areaId')
            .addSelect('area2.name', 'areaName')
            .from(area_entity_1.AreaEntity, 'area2'), 'area2', 'tenant.areaId=area2.areaId');
    }
};
exports.TenantService = TenantService;
exports.TenantService = TenantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tenant_entity_1.TenantEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(account_entity_1.AccountEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        tools_service_1.ToolsService,
        config_1.ConfigService,
        typeorm_2.DataSource])
], TenantService);
//# sourceMappingURL=tenant.service.js.map