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
exports.DepartmentController = void 0;
const common_1 = require("@nestjs/common");
const department_service_1 = require("./department.service");
const department_dto_1 = require("./dto/department.dto");
const decorators_1 = require("../../decorators");
const department_query_1 = require("./dto/department.query");
const auth_guard_1 = require("../../guard/auth.guard");
let DepartmentController = class DepartmentController {
    constructor(departmentService) {
        this.departmentService = departmentService;
    }
    async createDepartmentApi(req, currentUser) {
        return await this.departmentService.createDepartmentApi(req, currentUser);
    }
    async deleteDepartmentByIdApi(id) {
        return await this.departmentService.deleteDepartmentByIdApi(id);
    }
    async modifyDepartmentStatusByIdApi(id) {
        return await this.departmentService.modifyDepartmentStatusByIdApi(id);
    }
    async modifyDepartmentByIdApi(id, req, currentUser) {
        return await this.departmentService.modifyDepartmentByIdApi(id, req, currentUser);
    }
    async getDepartmentPageApi(queryOption, currentUser) {
        return await this.departmentService.getDepartmentPageApi(queryOption, currentUser);
    }
    async getDepartmentListApi(currentUser) {
        return await this.departmentService.getDepartmentListApi(currentUser);
    }
    async getDepartmentByIdApi(id) {
        return await this.departmentService.getDepartmentByIdApi(id);
    }
    async batchDeleteDepartmentByIdListApi(idList) {
        return await this.departmentService.batchDeleteDepartmentByIdListApi(idList);
    }
    async batchModifyDepartmentStatusByIdApi(idList) {
        return await this.departmentService.batchModifyDepartmentStatusByIdApi(idList);
    }
};
exports.DepartmentController = DepartmentController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.CurrentUser)('userInfo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [department_dto_1.DepartmentDto, Object]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "createDepartmentApi", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "deleteDepartmentByIdApi", null);
__decorate([
    (0, common_1.Put)('/status/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "modifyDepartmentStatusByIdApi", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.CurrentUser)('userInfo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, department_dto_1.DepartmentDto, Object]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "modifyDepartmentByIdApi", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, decorators_1.CurrentUser)('userInfo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [department_query_1.QueryDepartmentDto, Object]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "getDepartmentPageApi", null);
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, decorators_1.CurrentUser)('userInfo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "getDepartmentListApi", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "getDepartmentByIdApi", null);
__decorate([
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "batchDeleteDepartmentByIdListApi", null);
__decorate([
    (0, common_1.Post)('/batchStatus'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "batchModifyDepartmentStatusByIdApi", null);
exports.DepartmentController = DepartmentController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('department'),
    __metadata("design:paramtypes", [department_service_1.DepartmentService])
], DepartmentController);
//# sourceMappingURL=department.controller.js.map