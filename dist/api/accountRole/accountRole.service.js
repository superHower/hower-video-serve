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
exports.AccountRoleService = void 0;
const common_1 = require("@nestjs/common");
const account_role_entity_1 = require("./entities/account.role.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("../role/entities/role.entity");
const enums_1 = require("../../enums");
const utils_1 = require("../../utils");
let AccountRoleService = class AccountRoleService {
    constructor(accountRoleRepository, roleRepository, dataSource) {
        this.accountRoleRepository = accountRoleRepository;
        this.roleRepository = roleRepository;
        this.dataSource = dataSource;
    }
    async distributionRoleApi(req) {
        if (req.roleList.length == 0) {
            const { affected } = await this.accountRoleRepository.delete({
                accountId: req.accountId,
            });
            if (affected) {
                return '删除成功';
            }
            else {
                return '删除失败';
            }
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const accountRoleEntity = await this.accountRoleRepository.find({
                where: { accountId: req.accountId },
                select: ['roleId'],
            });
            console.log(accountRoleEntity, '查询数据');
            if (accountRoleEntity.length) {
                const oldRoleIdList = accountRoleEntity.map((item) => item.roleId);
                const roleIdList = (0, utils_1.getJ)(oldRoleIdList, req.roleList);
                const roleIdDeleteList = (0, utils_1.getC)(roleIdList, oldRoleIdList);
                const createRoleList = (0, utils_1.getC)(roleIdList, req.roleList);
                if (createRoleList.length) {
                    const createAccountRoleData = createRoleList.map((item) => {
                        return {
                            accountId: req.accountId,
                            roleId: item,
                        };
                    });
                    const data = queryRunner.manager.create(account_role_entity_1.AccountRoleEntity, createAccountRoleData);
                    await queryRunner.manager.save(data);
                }
                if (roleIdDeleteList.length) {
                    const accountRoleEntity1 = await this.accountRoleRepository.find({
                        where: { accountId: req.accountId, roleId: (0, typeorm_2.In)(roleIdDeleteList) },
                        select: ['id'],
                    });
                    await queryRunner.manager.delete(account_role_entity_1.AccountRoleEntity, accountRoleEntity1.map((item) => item.id));
                }
            }
            else {
                console.log('进来了2');
                const createAccountRoleData = req.roleList.map((item) => {
                    return {
                        accountId: req.accountId,
                        roleId: item,
                    };
                });
                const data = queryRunner.manager.create(account_role_entity_1.AccountRoleEntity, createAccountRoleData);
                await queryRunner.manager.save(data);
            }
            await queryRunner.commitTransaction();
            return '分配角色成功';
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException('分配角色失败', common_1.HttpStatus.OK);
        }
        finally {
            await queryRunner.release();
        }
    }
    async getRoleByAccountIdApi(accountId) {
        const accountRoleEntity = await this.accountRoleRepository.find({
            where: { accountId },
            select: ['roleId'],
        });
        const roleIdList = accountRoleEntity.map((item) => item.roleId);
        return await this.roleRepository.find({
            where: { id: (0, typeorm_2.In)(roleIdList) },
        });
    }
    async getAllRolesApi(status, currentInfo) {
        if ([enums_1.StatusEnum.NORMAL, enums_1.StatusEnum.FORBIDDEN].includes(+status)) {
            return this.roleRepository.find({ where: { status, accountId: currentInfo.id } });
        }
        else {
            return this.roleRepository.find({ where: { accountId: currentInfo.id } });
        }
    }
};
exports.AccountRoleService = AccountRoleService;
exports.AccountRoleService = AccountRoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(account_role_entity_1.AccountRoleEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.RoleEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], AccountRoleService);
//# sourceMappingURL=accountRole.service.js.map