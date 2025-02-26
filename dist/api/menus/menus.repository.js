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
exports.MenusRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const account_type_enum_1 = require("../../enums/account.type.enum");
const utils_1 = require("../../utils");
const typeorm_2 = require("typeorm");
const account_role_entity_1 = require("../accountRole/entities/account.role.entity");
const resources_entity_1 = require("../resources/entities/resources.entity");
const role_resources_entity_1 = require("../roleResources/entities/role.resources.entity");
let MenusRepository = class MenusRepository {
    constructor(accountRoleRepository, roleResourcesRepository, resourcesRepository) {
        this.accountRoleRepository = accountRoleRepository;
        this.roleResourcesRepository = roleResourcesRepository;
        this.resourcesRepository = resourcesRepository;
    }
    async getResourcesIdList(userInfo, type) {
        const { accountType } = userInfo;
        if (accountType == account_type_enum_1.AccountTypeEnum.SUPER_ACCOUNT) {
            const resourcesEntity = await this.resourcesRepository.find({
                select: ['id'],
            });
            return resourcesEntity.map((item) => item.id);
        }
        else {
            const query = new Map();
            const accountRoleEntity = await this.accountRoleRepository.find({
                where: { accountId: userInfo.id },
                select: ['roleId'],
            });
            if (!accountRoleEntity.length) {
                return [];
            }
            console.log('全部的角色', accountRoleEntity);
            query.set('roleId', (0, typeorm_2.In)(accountRoleEntity.map((item) => item.roleId)));
            query.set('type', (0, typeorm_2.Equal)(type + ''));
            const roleResourcesEntity = await this.roleResourcesRepository.find({
                where: (0, utils_1.mapToObj)(query),
                select: ['resourcesId'],
            });
            if (!roleResourcesEntity.length) {
                return [];
            }
            return roleResourcesEntity.map((item) => item.resourcesId);
        }
    }
};
exports.MenusRepository = MenusRepository;
exports.MenusRepository = MenusRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(account_role_entity_1.AccountRoleEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(role_resources_entity_1.RoleResourcesEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(resources_entity_1.ResourcesEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MenusRepository);
//# sourceMappingURL=menus.repository.js.map