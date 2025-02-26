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
exports.CreateDefaultAccountDto = exports.RechargeDto = exports.TenantDto = void 0;
const validators_1 = require("../../../validators");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class TenantDto {
}
exports.TenantDto = TenantDto;
__decorate([
    (0, class_validator_1.MaxLength)(50, { message: '商户名称最大长度50' }),
    (0, class_validator_1.IsNotEmpty)({ message: '商户名称不能为空' }),
    __metadata("design:type", String)
], TenantDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(50, { message: '商户联系人最大长度50' }),
    (0, class_validator_1.IsOptional)({ message: '商户联系人' }),
    __metadata("design:type", String)
], TenantDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsMobilePhone)('zh-CN', { strictMode: false }, { message: '手机号码格式错误' }),
    (0, class_validator_1.IsOptional)({ message: '手机号码' }),
    __metadata("design:type", String)
], TenantDto.prototype, "mobile", void 0);
__decorate([
    (0, validators_1.IsDateFormateString)(),
    (0, class_validator_1.IsNotEmpty)({ message: '过期时间不能为空' }),
    __metadata("design:type", Date)
], TenantDto.prototype, "expireTime", void 0);
__decorate([
    (0, class_validator_1.Min)(1, { message: '省份最小值为1' }),
    (0, class_validator_1.IsInt)({ message: '省份必须是整数' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)({ message: '省份id' }),
    __metadata("design:type", Number)
], TenantDto.prototype, "provinceId", void 0);
__decorate([
    (0, class_validator_1.Min)(1, { message: '市最小值为1' }),
    (0, class_validator_1.IsInt)({ message: '市必须是整数' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)({ message: '市id' }),
    __metadata("design:type", Number)
], TenantDto.prototype, "cityId", void 0);
__decorate([
    (0, class_validator_1.Min)(1, { message: '地区最小值为1' }),
    (0, class_validator_1.IsInt)({ message: '地区必须是整数' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)({ message: '地区id' }),
    __metadata("design:type", Number)
], TenantDto.prototype, "areaId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)({ message: '地址' }),
    __metadata("design:type", String)
], TenantDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.Min)(1, { message: '排序最小值为1' }),
    (0, class_validator_1.IsInt)({ message: '排序必须是整数' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)({ message: '排序' }),
    __metadata("design:type", Number)
], TenantDto.prototype, "sort", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(255, { message: '描述最大长度为255' }),
    (0, class_validator_1.IsOptional)({ message: '描述' }),
    __metadata("design:type", String)
], TenantDto.prototype, "description", void 0);
class RechargeDto {
}
exports.RechargeDto = RechargeDto;
__decorate([
    (0, class_validator_1.Min)(1, { message: '排序最小值为1' }),
    (0, class_validator_1.IsInt)({ message: '排序必须是整数' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)({ message: '商户id不能为空' }),
    __metadata("design:type", Number)
], RechargeDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '充值金额不能为空' }),
    __metadata("design:type", Number)
], RechargeDto.prototype, "amount", void 0);
class CreateDefaultAccountDto {
}
exports.CreateDefaultAccountDto = CreateDefaultAccountDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '账号名不能为空' }),
    __metadata("design:type", String)
], CreateDefaultAccountDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '商户id不能为空' }),
    __metadata("design:type", Number)
], CreateDefaultAccountDto.prototype, "tenantId", void 0);
__decorate([
    (0, class_validator_1.Min)(1, { message: '排序最小值为1' }),
    (0, class_validator_1.IsInt)({ message: '排序必须是整数' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)({ message: '排序' }),
    __metadata("design:type", Number)
], CreateDefaultAccountDto.prototype, "sort", void 0);
//# sourceMappingURL=tenant.dto.js.map