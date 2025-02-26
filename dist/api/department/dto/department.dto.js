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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class DepartmentDto {
}
exports.DepartmentDto = DepartmentDto;
__decorate([
    (0, class_validator_1.MaxLength)(50, { message: '部门名称最大长度为50' }),
    (0, class_validator_1.IsNotEmpty)({ message: '部门名称不能为空' }),
    __metadata("design:type", String)
], DepartmentDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.Min)(1, { message: '部门负责人最小值为1' }),
    (0, class_validator_1.IsInt)({ message: '部门负责人必须是整数' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)({ message: '部门负责人' }),
    __metadata("design:type", Number)
], DepartmentDto.prototype, "accountId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)({ message: '联系手机号码' }),
    __metadata("design:type", String)
], DepartmentDto.prototype, "mobile", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: '电邮地址错误' }),
    (0, class_validator_1.IsOptional)({ message: '电邮地址' }),
    __metadata("design:type", String)
], DepartmentDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(255, { message: '描述最大长度为255' }),
    (0, class_validator_1.IsOptional)({ message: '描述' }),
    __metadata("design:type", String)
], DepartmentDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.Min)(1, { message: '排序最小值为1' }),
    (0, class_validator_1.IsInt)({ message: '排序必须是整数' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)({ message: '排序' }),
    __metadata("design:type", Number)
], DepartmentDto.prototype, "sort", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: '自己关联主键id必须是整数' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], DepartmentDto.prototype, "parentId", void 0);
//# sourceMappingURL=department.dto.js.map