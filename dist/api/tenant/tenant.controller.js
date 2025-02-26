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
exports.TenantController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../decorators");
const auth_guard_1 = require("../../guard/auth.guard");
const tenant_dto_1 = require("./dto/tenant.dto");
const tenant_query_1 = require("./dto/tenant.query");
const tenant_service_1 = require("./tenant.service");
let TenantController = class TenantController {
    constructor(tenantService) {
        this.tenantService = tenantService;
    }
    async createTenantApi(req) {
        return await this.tenantService.createTenantApi(req);
    }
    async deleteTenantByIdApi(id, currentUser) {
        return await this.tenantService.deleteTenantByIdApi(id, currentUser);
    }
    async modifyTenantStatusByIdApi(id, currentUser) {
        return await this.tenantService.modifyTenantStatusByIdApi(id, currentUser);
    }
    async modifyTenantByIdApi(id, req) {
        return await this.tenantService.modifyTenantByIdApi(id, req);
    }
    async getTenantPageApi(queryOption) {
        return await this.tenantService.getTenantPageApi(queryOption);
    }
    async getTenantByIdApi(id) {
        return await this.tenantService.getTenantByIdApi(id);
    }
    async batchDeleteTenantByIdListApi(idList, currentUser) {
        return await this.tenantService.batchDeleteTenantByIdListApi(idList, currentUser);
    }
    async batchModifyTenantStatusByIdApi(idList, currentUser) {
        return await this.tenantService.batchModifyTenantStatusByIdApi(idList, currentUser);
    }
    async rechargeTenantApi(req) {
        return await this.tenantService.rechargeTenantApi(req);
    }
    async createDefaultAccount(req) {
        return await this.tenantService.createDefaultAccount(req);
    }
};
exports.TenantController = TenantController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tenant_dto_1.TenantDto]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "createTenantApi", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __param(1, (0, decorators_1.CurrentUser)('userInfo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "deleteTenantByIdApi", null);
__decorate([
    (0, common_1.Put)('/status/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __param(1, (0, decorators_1.CurrentUser)('userInfo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "modifyTenantStatusByIdApi", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, tenant_dto_1.TenantDto]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "modifyTenantByIdApi", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tenant_query_1.QueryTenantDto]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "getTenantPageApi", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "getTenantByIdApi", null);
__decorate([
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.CurrentUser)('userInfo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "batchDeleteTenantByIdListApi", null);
__decorate([
    (0, common_1.Post)('/batchStatus'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.CurrentUser)('userInfo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "batchModifyTenantStatusByIdApi", null);
__decorate([
    (0, common_1.Post)('recharge'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tenant_dto_1.RechargeDto]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "rechargeTenantApi", null);
__decorate([
    (0, common_1.Post)('defaultAccount'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tenant_dto_1.CreateDefaultAccountDto]),
    __metadata("design:returntype", Promise)
], TenantController.prototype, "createDefaultAccount", null);
exports.TenantController = TenantController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('tenant'),
    __metadata("design:paramtypes", [tenant_service_1.TenantService])
], TenantController);
//# sourceMappingURL=tenant.controller.js.map