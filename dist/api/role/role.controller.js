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
exports.RoleController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../decorators");
const auth_guard_1 = require("../../guard/auth.guard");
const role_dto_1 = require("./dto/role.dto");
const role_query_1 = require("./dto/role.query");
const role_service_1 = require("./role.service");
let RoleController = class RoleController {
    constructor(roleService) {
        this.roleService = roleService;
    }
    async createRoleApi(req, currentInfo) {
        return await this.roleService.createRoleApi(req, currentInfo);
    }
    async deleteRoleByIdApi(id) {
        return await this.roleService.deleteRoleByIdApi(id);
    }
    async modifyRoleStatusByIdApi(id) {
        return await this.roleService.modifyRoleStatusByIdApi(id);
    }
    async modifyRoleByIdApi(id, req) {
        return await this.roleService.modifyRoleByIdApi(id, req);
    }
    async getRolePageApi(queryOption, currentInfo) {
        return await this.roleService.getRolePageApi(queryOption, currentInfo);
    }
    async getRoleByIdApi(id) {
        return await this.roleService.getRoleByIdApi(id);
    }
    async batchDeleteRoleByIdListApi(idList) {
        return await this.roleService.batchDeleteRoleByIdListApi(idList);
    }
    async batchModifyRoleStatusByIdApi(idList) {
        return await this.roleService.batchModifyRoleStatusByIdApi(idList);
    }
};
exports.RoleController = RoleController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.CurrentUser)('userInfo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.RoleDto, Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "createRoleApi", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "deleteRoleByIdApi", null);
__decorate([
    (0, common_1.Put)('/status/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "modifyRoleStatusByIdApi", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, role_dto_1.RoleDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "modifyRoleByIdApi", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.CurrentUser)('userInfo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_query_1.QueryRoleDto, Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getRolePageApi", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getRoleByIdApi", null);
__decorate([
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "batchDeleteRoleByIdListApi", null);
__decorate([
    (0, common_1.Post)('/batchStatus'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "batchModifyRoleStatusByIdApi", null);
exports.RoleController = RoleController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('role'),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], RoleController);
//# sourceMappingURL=role.controller.js.map