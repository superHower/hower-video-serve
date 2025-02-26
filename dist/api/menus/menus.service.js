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
exports.MenusService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const enums_1 = require("../../enums");
const account_type_enum_1 = require("../../enums/account.type.enum");
const utils_1 = require("../../utils");
const typeorm_2 = require("typeorm");
const resources_entity_1 = require("../resources/entities/resources.entity");
const menus_repository_1 = require("./menus.repository");
let MenusService = class MenusService {
    constructor(resourcesRepository, menusRepository) {
        this.resourcesRepository = resourcesRepository;
        this.menusRepository = menusRepository;
    }
    async getAllMenusApi(userInfo) {
        const { accountType } = userInfo;
        const query = new Map();
        query.set('status', enums_1.StatusEnum.NORMAL);
        query.set('resourcesType', (0, typeorm_2.In)([0, 1]));
        if (accountType !== account_type_enum_1.AccountTypeEnum.SUPER_ACCOUNT) {
            const resourcesIdList = await this.menusRepository.getResourcesIdList(userInfo, 0);
            console.log(resourcesIdList, '资源');
            query.set('id', (0, typeorm_2.In)(resourcesIdList));
        }
        console.log(userInfo);
        return await this.resourcesRepository
            .createQueryBuilder('resources')
            .where((0, utils_1.mapToObj)(query))
            .orderBy({ sort: 'ASC' })
            .getMany();
    }
    async getBtnByMenusUrlApi(urlName, userInfo) {
        const resourcesEntity = await this.resourcesRepository.findOne({
            where: { url: urlName },
            select: ['id'],
        });
        if (!(resourcesEntity === null || resourcesEntity === void 0 ? void 0 : resourcesEntity.id)) {
            return [];
        }
        const resourcesId = await this.menusRepository.getResourcesIdList(userInfo, 1);
        console.log(resourcesId, '全部资源');
        return await this.resourcesRepository.find({
            where: {
                id: (0, typeorm_2.In)(resourcesId),
                resourcesType: 2,
                parentId: resourcesEntity === null || resourcesEntity === void 0 ? void 0 : resourcesEntity.id,
                status: enums_1.StatusEnum.NORMAL,
            },
            order: { sort: 'ASC', id: 'DESC' },
            select: ['id', 'title'],
        });
    }
    async getResourcesList(userInfo) {
        const resourcesId = await this.menusRepository.getResourcesIdList(userInfo, 0);
        return await this.resourcesRepository.find({
            where: { id: (0, typeorm_2.In)(resourcesId) },
        });
    }
};
exports.MenusService = MenusService;
exports.MenusService = MenusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(resources_entity_1.ResourcesEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        menus_repository_1.MenusRepository])
], MenusService);
//# sourceMappingURL=menus.service.js.map