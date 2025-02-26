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
exports.MenusController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../decorators");
const auth_guard_1 = require("../../guard/auth.guard");
const menus_service_1 = require("./menus.service");
let MenusController = class MenusController {
    constructor(menusService) {
        this.menusService = menusService;
    }
    async getAllMenusApi(userInfo) {
        return await this.menusService.getAllMenusApi(userInfo);
    }
    async getBtnByMenusUrlApi(userInfo, urlName) {
        return await this.menusService.getBtnByMenusUrlApi(urlName, userInfo);
    }
};
exports.MenusController = MenusController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, decorators_1.CurrentUser)('userInfo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MenusController.prototype, "getAllMenusApi", null);
__decorate([
    (0, common_1.Get)('btnList'),
    __param(0, (0, decorators_1.CurrentUser)('userInfo')),
    __param(1, (0, common_1.Query)('urlName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MenusController.prototype, "getBtnByMenusUrlApi", null);
exports.MenusController = MenusController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('menus'),
    __metadata("design:paramtypes", [menus_service_1.MenusService])
], MenusController);
//# sourceMappingURL=menus.controller.js.map