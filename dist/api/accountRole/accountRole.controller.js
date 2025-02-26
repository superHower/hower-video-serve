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
exports.AccountRoleController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../decorators");
const auth_guard_1 = require("../../guard/auth.guard");
const accountRole_service_1 = require("./accountRole.service");
const account_role_dto_1 = require("./dto/account.role.dto");
let AccountRoleController = class AccountRoleController {
    constructor(accountRoleService) {
        this.accountRoleService = accountRoleService;
    }
    async distributionRoleApi(req) {
        console.log('输出', req);
        return await this.accountRoleService.distributionRoleApi(req);
    }
    async getRoleByAccountIdApi(accountId) {
        return await this.accountRoleService.getRoleByAccountIdApi(accountId);
    }
    async getAllRolesApi(status, currentInfo) {
        return await this.accountRoleService.getAllRolesApi(status, currentInfo);
    }
};
exports.AccountRoleController = AccountRoleController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_role_dto_1.AccountRoleDto]),
    __metadata("design:returntype", Promise)
], AccountRoleController.prototype, "distributionRoleApi", null);
__decorate([
    (0, common_1.Get)(':accountId'),
    __param(0, (0, common_1.Param)('accountId', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AccountRoleController.prototype, "getRoleByAccountIdApi", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, decorators_1.CurrentUser)('userInfo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AccountRoleController.prototype, "getAllRolesApi", null);
exports.AccountRoleController = AccountRoleController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('accountRole'),
    __metadata("design:paramtypes", [accountRole_service_1.AccountRoleService])
], AccountRoleController);
//# sourceMappingURL=accountRole.controller.js.map