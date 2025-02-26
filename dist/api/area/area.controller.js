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
exports.AreaController = void 0;
const common_1 = require("@nestjs/common");
const area_service_1 = require("./area.service");
const decorators_1 = require("../../decorators");
let AreaController = class AreaController {
    constructor(areaService) {
        this.areaService = areaService;
    }
    async getDataByPidApi(pid) {
        return await this.areaService.getDataByPidApi(pid);
    }
    async getAllCityApi() {
        return await this.areaService.getAllCityApi();
    }
};
exports.AreaController = AreaController;
__decorate([
    (0, common_1.Get)(':pid'),
    (0, decorators_1.RedisCacheApi)({ exSecond: 7 * 24 * 60 * 60 }),
    __param(0, (0, common_1.Param)('pid', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AreaController.prototype, "getDataByPidApi", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.RedisCacheApi)({ exSecond: 7 * 24 * 60 * 60 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AreaController.prototype, "getAllCityApi", null);
exports.AreaController = AreaController = __decorate([
    (0, common_1.Controller)('area'),
    __metadata("design:paramtypes", [area_service_1.AreaService])
], AreaController);
//# sourceMappingURL=area.controller.js.map