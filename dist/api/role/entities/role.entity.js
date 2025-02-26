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
exports.RoleEntity = void 0;
const base_entity_1 = require("../../../shared/entities/base.entity");
const typeorm_1 = require("typeorm");
let RoleEntity = class RoleEntity extends base_entity_1.SharedEntity {
};
exports.RoleEntity = RoleEntity;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        name: 'name',
        comment: '角色名称',
    }),
    __metadata("design:type", String)
], RoleEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        name: 'description',
        nullable: true,
        comment: '描述',
    }),
    __metadata("design:type", String)
], RoleEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'tinyint',
        name: 'status',
        nullable: true,
        default: '0',
        comment: '状态0是正常,1是禁用',
    }),
    __metadata("design:type", Number)
], RoleEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        name: 'sort',
        nullable: true,
        default: '1',
        comment: '排序',
    }),
    __metadata("design:type", Number)
], RoleEntity.prototype, "sort", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        name: 'tenant_id',
        nullable: true,
        default: '-1',
        comment: '关联到tenant表主键id',
    }),
    __metadata("design:type", Number)
], RoleEntity.prototype, "tenantId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        name: 'account_id',
        nullable: true,
        default: '-1',
        comment: '关联account主键id',
    }),
    __metadata("design:type", Number)
], RoleEntity.prototype, "accountId", void 0);
exports.RoleEntity = RoleEntity = __decorate([
    (0, typeorm_1.Entity)('role')
], RoleEntity);
//# sourceMappingURL=role.entity.js.map