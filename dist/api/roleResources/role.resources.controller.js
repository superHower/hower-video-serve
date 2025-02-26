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
exports.RoleResourcesController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("@nestjs/common/decorators");
const auth_guard_1 = require("../../guard/auth.guard");
const role_resources_dto_1 = require("./dto/role.resources.dto");
const role_resources_service_1 = require("./role.resources.service");
let RoleResourcesController = class RoleResourcesController {
    constructor(roleResourcesService) {
        this.roleResourcesService = roleResourcesService;
    }
    async dispatchResourcesApi(req) {
        return await this.roleResourcesService.dispatchResourcesApi(req);
    }
    async getResourceByRoleIdApi(roleId, type) {
        return await this.roleResourcesService.getResourceByRoleIdApi(roleId, type);
    }
};
exports.RoleResourcesController = RoleResourcesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_resources_dto_1.RoleResourcesDto]),
    __metadata("design:returntype", Promise)
], RoleResourcesController.prototype, "dispatchResourcesApi", null);
__decorate([
    (0, common_1.Get)(':roleId'),
    __param(0, (0, common_1.Param)('roleId', new common_1.ParseIntPipe())),
    __param(1, (0, decorators_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], RoleResourcesController.prototype, "getResourceByRoleIdApi", null);
exports.RoleResourcesController = RoleResourcesController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('roleResources'),
    __metadata("design:paramtypes", [role_resources_service_1.RoleResourcesService])
], RoleResourcesController);
//# sourceMappingURL=role.resources.controller.js.map