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
exports.AccountController = void 0;
const common_1 = require("@nestjs/common");
const account_service_1 = require("./account.service");
const account_dto_1 = require("./dto/account.dto");
const auth_guard_1 = require("../../guard/auth.guard");
const decorators_1 = require("../../decorators");
const account_query_1 = require("./dto/account.query");
let AccountController = class AccountController {
    constructor(accountService) {
        this.accountService = accountService;
    }
    async createAccountApi(req) {
        return await this.accountService.createAccountApi(req);
    }
    async deleteAccountByIdApi(id, currentUser) {
        return await this.accountService.deleteAccountByIdApi(id, currentUser);
    }
    async modifyAccountStatusByIdApi(id, currentUser) {
        return await this.accountService.modifyAccountStatusByIdApi(id, currentUser);
    }
    async modifyAccountByIdApi(id, req) {
        return await this.accountService.modifyAccountByIdApi(id, req);
    }
    async getAccountPageApi(queryOption, currentInfo) {
        return await this.accountService.getAccountPageApi(queryOption, currentInfo);
    }
    async getAccountListApi(currentInfo, status) {
        return await this.accountService.getAccountListApi(currentInfo, status);
    }
    async getAccountByIdApi(id) {
        return await this.accountService.getAccountByIdApi(id);
    }
    async batchDeleteAccountByIdListApi(idList, currentUser) {
        return await this.accountService.batchDeleteAccountByIdListApi(idList, currentUser);
    }
    async batchModifyAccountStatusByIdApi(idList, currentUser) {
        return await this.accountService.batchModifyAccountStatusByIdApi(idList, currentUser);
    }
};
exports.AccountController = AccountController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_dto_1.AccountDto]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "createAccountApi", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __param(1, (0, decorators_1.CurrentUser)('userInfo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "deleteAccountByIdApi", null);
__decorate([
    (0, common_1.Put)('/status/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __param(1, (0, decorators_1.CurrentUser)('userInfo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "modifyAccountStatusByIdApi", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, account_dto_1.AccountDto]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "modifyAccountByIdApi", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.CurrentUser)('userInfo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_query_1.QueryAccountDto, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountPageApi", null);
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, decorators_1.CurrentUser)('userInfo')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountListApi", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getAccountByIdApi", null);
__decorate([
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.CurrentUser)('userInfo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "batchDeleteAccountByIdListApi", null);
__decorate([
    (0, common_1.Post)('/batchStatus'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.CurrentUser)('userInfo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "batchModifyAccountStatusByIdApi", null);
exports.AccountController = AccountController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('account'),
    __metadata("design:paramtypes", [account_service_1.AccountService])
], AccountController);
//# sourceMappingURL=account.controller.js.map