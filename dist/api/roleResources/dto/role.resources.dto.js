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
exports.RoleResourcesDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class RoleResourcesDto {
}
exports.RoleResourcesDto = RoleResourcesDto;
__decorate([
    (0, class_validator_1.IsInt)({ message: '角色ID必须为整数' }),
    (0, class_validator_1.IsNotEmpty)({ message: '角色ID不能为空' }),
    __metadata("design:type", Number)
], RoleResourcesDto.prototype, "roleId", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsArray)({ message: '资源ID列表必须是一个数组' }),
    __metadata("design:type", Array)
], RoleResourcesDto.prototype, "resourceList", void 0);
__decorate([
    (0, class_validator_1.Max)(1, { message: '类型id最大值为1' }),
    (0, class_validator_1.Min)(0, { message: '类型id最小值为0' }),
    (0, class_validator_1.IsInt)({ message: '类型id必须是整数' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)({ message: '类型,0表示菜单1表示按钮' }),
    __metadata("design:type", Number)
], RoleResourcesDto.prototype, "type", void 0);
//# sourceMappingURL=role.resources.dto.js.map