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
exports.ResourcesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const enums_1 = require("../../enums");
const utils_1 = require("../../utils");
const typeorm_2 = require("typeorm");
const menus_repository_1 = require("../menus/menus.repository");
const resources_entity_1 = require("./entities/resources.entity");
let ResourcesService = class ResourcesService {
    constructor(resourcesRepository, menusRepository) {
        this.resourcesRepository = resourcesRepository;
        this.menusRepository = menusRepository;
    }
    async createResourceApi(resourcesDto) {
        const data = this.resourcesRepository.create(resourcesDto);
        await this.resourcesRepository.save(data);
        return '创建成功';
    }
    async deleteResourceByIdApi(id) {
        const { affected } = await this.resourcesRepository.delete(id);
        if (affected) {
            return '删除成功';
        }
        else {
            return '删除失败';
        }
    }
    async modifyResourceByIdApi(id, resourcesDto) {
        const { affected } = await this.resourcesRepository.update(id, resourcesDto);
        if (affected) {
            return '修改成功';
        }
        else {
            return '修改失败';
        }
    }
    async getResourcePageApi(queryResourcesDto) {
        const { pageNumber = enums_1.PageEnum.PAGE_NUMBER, pageSize = enums_1.PageEnum.PAGE_SIZE, title, resourcesType, parentId, status, } = queryResourcesDto;
        const queryMap = new Map();
        if (title) {
            queryMap.set('title', (0, typeorm_2.ILike)(`%${title}%`));
        }
        if ([(enums_1.StatusEnum.NORMAL, enums_1.StatusEnum.FORBIDDEN)].includes(status)) {
            queryMap.set('status', (0, typeorm_2.Equal)(status + ''));
        }
        if ([0, 1, 2].includes(resourcesType)) {
            queryMap.set('resourcesType', (0, typeorm_2.Equal)(resourcesType + ''));
        }
        if (parentId) {
            queryMap.set('parentId', (0, typeorm_2.Equal)(parentId + ''));
        }
        else {
            queryMap.set('parentId', (0, typeorm_2.Equal)('-1'));
        }
        const [data, total] = await this.resourcesRepository
            .createQueryBuilder()
            .skip((pageNumber - 1) * pageSize)
            .take(pageSize)
            .orderBy({ sort: 'ASC', id: 'DESC' })
            .printSql()
            .where((0, utils_1.mapToObj)(queryMap))
            .getManyAndCount();
        const resourcesIdList = data.map((item) => item.id);
        const resourcesEntityList = await this.resourcesRepository.find({
            where: { parentId: (0, typeorm_2.In)(resourcesIdList) },
            select: ['parentId'],
        });
        const resourcesMap = new Map();
        for (const item of resourcesEntityList) {
            resourcesMap.set(item.parentId, true);
        }
        const result = [];
        for (const item of data) {
            result.push(Object.assign(Object.assign({}, item), { hasChildren: resourcesMap.get(item.id) }));
        }
        return {
            data: result,
            total,
            pageNumber: +pageNumber,
            pageSize: +pageSize,
        };
    }
    async getResourceCatalogApi(catalogType) {
        console.log(catalogType, '111---->');
        const queryMap = new Map();
        if (catalogType == 2) {
            queryMap.set('resourcesType', (0, typeorm_2.In)([0, 1]));
        }
        else {
            queryMap.set('resourcesType', (0, typeorm_2.In)([0]));
        }
        return await this.resourcesRepository.find({
            where: (0, utils_1.mapToObj)(queryMap),
            select: ['id', 'title', 'parentId'],
        });
    }
    async getResourcesListApi(type, currentInfo) {
        console.log(currentInfo, '当前用户');
        let resourcesType = [];
        if (type == 0) {
            resourcesType = [0, 1];
        }
        else if (type == 1) {
            resourcesType = [0, 1, 2];
        }
        const resourcesIdList = await this.menusRepository.getResourcesIdList(currentInfo, type);
        return await this.resourcesRepository.find({
            where: {
                id: (0, typeorm_2.In)(resourcesIdList),
                resourcesType: (0, typeorm_2.In)(resourcesType),
                status: enums_1.StatusEnum.NORMAL,
            },
            select: ['id', 'title', 'parentId', 'resourcesType'],
        });
    }
    async getMenusByCatalogIdApi(id) {
        return await this.resourcesRepository.find({
            where: { parentId: id, resourcesType: 1 },
            select: ['id', 'title'],
        });
    }
};
exports.ResourcesService = ResourcesService;
exports.ResourcesService = ResourcesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(resources_entity_1.ResourcesEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        menus_repository_1.MenusRepository])
], ResourcesService);
//# sourceMappingURL=resources.service.js.map