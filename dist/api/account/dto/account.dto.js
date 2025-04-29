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
exports.AccountDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class AccountDto {
}
exports.AccountDto = AccountDto;
__decorate([
    (0, class_validator_1.MaxLength)(50, { message: '账号最大长度为50' }),
    (0, class_validator_1.IsNotEmpty)({ message: '账号不能为空' }),
    __metadata("design:type", String)
], AccountDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(50, { message: '密码最大长度为50' }),
    (0, class_validator_1.IsOptional)({ message: '密码' }),
    __metadata("design:type", String)
], AccountDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(512, { message: '简介最大长度为512' }),
    (0, class_validator_1.IsOptional)({ message: '简介' }),
    __metadata("design:type", String)
], AccountDto.prototype, "info", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(10, { message: '昵称最大长度为10' }),
    (0, class_validator_1.IsOptional)({ message: '昵称' }),
    __metadata("design:type", String)
], AccountDto.prototype, "nickname", void 0);
__decorate([
    (0, class_validator_1.IsOptional)({ message: '头像' }),
    __metadata("design:type", String)
], AccountDto.prototype, "avatar", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: '性别必须是整数' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)({ message: '性别' }),
    __metadata("design:type", Number)
], AccountDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: '年龄必须是整数' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)({ message: '年龄' }),
    __metadata("design:type", Number)
], AccountDto.prototype, "age", void 0);
__decorate([
    (0, class_validator_1.Min)(1, { message: '排序最小值为1' }),
    (0, class_validator_1.IsInt)({ message: '排序必须是整数' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)({ message: '排序' }),
    __metadata("design:type", Number)
], AccountDto.prototype, "sort", void 0);
__decorate([
    (0, class_validator_1.Min)(1, { message: '父节点id最小值为1' }),
    (0, class_validator_1.IsInt)({ message: '父节点id必须是整数' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)({ message: '父节点id' }),
    __metadata("design:type", Number)
], AccountDto.prototype, "parentId", void 0);
__decorate([
    (0, class_validator_1.Min)(1, { message: '部门节点id最小值为1' }),
    (0, class_validator_1.IsInt)({ message: '部门节点id必须是整数' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)({ message: '部门节点id' }),
    __metadata("design:type", Number)
], AccountDto.prototype, "departmentId", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: '账号类型必须是整数' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)({ message: '账号类型' }),
    __metadata("design:type", Number)
], AccountDto.prototype, "accountType", void 0);
//# sourceMappingURL=account.dto.js.map