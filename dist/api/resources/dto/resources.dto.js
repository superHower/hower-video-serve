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
exports.ResourcesDto = void 0;
const method_enum_1 = require("../../../enums/method.enum");
const validators_1 = require("../../../validators");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class ResourcesDto {
}
exports.ResourcesDto = ResourcesDto;
__decorate([
    (0, class_validator_1.MaxLength)(50, { message: '标题长度最大长度为50' }),
    (0, class_validator_1.IsNotEmpty)({ message: '接口标题,或菜单标题不能为空' }),
    __metadata("design:type", String)
], ResourcesDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(100, { message: '接口请求url,或菜单路由最大长度为100' }),
    (0, class_validator_1.IsNotEmpty)({ message: '接口请求url,或菜单路由不能为空' }),
    __metadata("design:type", String)
], ResourcesDto.prototype, "url", void 0);
__decorate([
    (0, validators_1.IsIncludes)([
        method_enum_1.MethodEnum.GET,
        method_enum_1.MethodEnum.POST,
        method_enum_1.MethodEnum.DELETE,
        method_enum_1.MethodEnum.PUT,
        method_enum_1.MethodEnum.PATCH,
    ]),
    (0, class_validator_1.IsOptional)({ message: '接口的请求方式' }),
    __metadata("design:type", String)
], ResourcesDto.prototype, "method", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(100, { message: '菜单小图标最大长度为100' }),
    (0, class_validator_1.IsOptional)({ message: '菜单小图标' }),
    __metadata("design:type", String)
], ResourcesDto.prototype, "icon", void 0);
__decorate([
    (0, class_validator_1.Min)(1, { message: '菜单,或接口排序最小值为0' }),
    (0, class_validator_1.IsInt)({ message: '菜单,或接口排序必须是数字' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], ResourcesDto.prototype, "sort", void 0);
__decorate([
    (0, class_validator_1.Max)(2, { message: '0目录,1菜单,2接口' }),
    (0, class_validator_1.Min)(0, { message: '0目录,1菜单,2接口' }),
    (0, class_validator_1.IsInt)({ message: '类型必须是数字' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)({ message: '类型不能为空' }),
    __metadata("design:type", Number)
], ResourcesDto.prototype, "resourcesType", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: '上一级id' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)({ message: '父级' }),
    __metadata("design:type", Number)
], ResourcesDto.prototype, "parentId", void 0);
//# sourceMappingURL=resources.dto.js.map