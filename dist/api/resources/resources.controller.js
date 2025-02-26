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
exports.ResourcesController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../decorators");
const auth_guard_1 = require("../../guard/auth.guard");
const resources_dto_1 = require("./dto/resources.dto");
const resources_query_dto_1 = require("./dto/resources.query.dto");
const resources_service_1 = require("./resources.service");
let ResourcesController = class ResourcesController {
    constructor(resourcesService) {
        this.resourcesService = resourcesService;
    }
    async createResourceApi(resourcesDto) {
        return await this.resourcesService.createResourceApi(resourcesDto);
    }
    async deleteResourceByIdApi(id) {
        return await this.resourcesService.deleteResourceByIdApi(id);
    }
    async modifyResourceByIdApi(id, resourcesDto) {
        return await this.resourcesService.modifyResourceByIdApi(id, resourcesDto);
    }
    async getResourcePageApi(queryResourcesDto) {
        return await this.resourcesService.getResourcePageApi(queryResourcesDto);
    }
    async getResourceCatalogApi(catalogType) {
        return await this.resourcesService.getResourceCatalogApi(catalogType);
    }
    async getResourcesListApi(type, currentInfo) {
        return await this.resourcesService.getResourcesListApi(type, currentInfo);
    }
    async getMenusByCatalogIdApi(id) {
        return await this.resourcesService.getMenusByCatalogIdApi(id);
    }
};
exports.ResourcesController = ResourcesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resources_dto_1.ResourcesDto]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "createResourceApi", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "deleteResourceByIdApi", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, resources_dto_1.ResourcesDto]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "modifyResourceByIdApi", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resources_query_dto_1.QueryResourcesDto]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "getResourcePageApi", null);
__decorate([
    (0, common_1.Get)('catalog'),
    __param(0, (0, common_1.Query)('catalogType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "getResourceCatalogApi", null);
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)('type')),
    __param(1, (0, decorators_1.CurrentUser)('userInfo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "getResourcesListApi", null);
__decorate([
    (0, common_1.Get)('menus/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "getMenusByCatalogIdApi", null);
exports.ResourcesController = ResourcesController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('resources'),
    __metadata("design:paramtypes", [resources_service_1.ResourcesService])
], ResourcesController);
//# sourceMappingURL=resources.controller.js.map