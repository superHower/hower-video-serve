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
exports.AccountRoleDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class AccountRoleDto {
}
exports.AccountRoleDto = AccountRoleDto;
__decorate([
    (0, class_validator_1.Min)(1, { message: '账号id最小值为1' }),
    (0, class_validator_1.IsInt)({ message: '账号id必须是整数' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)({ message: '账号id不能为空' }),
    __metadata("design:type", Number)
], AccountRoleDto.prototype, "accountId", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsArray)({ message: '角色ID列表必须是一个数组' }),
    __metadata("design:type", Array)
], AccountRoleDto.prototype, "roleList", void 0);
//# sourceMappingURL=account.role.dto.js.map