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
exports.RoleResourcesEntity = void 0;
const base_entity_1 = require("../../../shared/entities/base.entity");
const typeorm_1 = require("typeorm");
let RoleResourcesEntity = class RoleResourcesEntity extends base_entity_1.SharedEntity {
};
exports.RoleResourcesEntity = RoleResourcesEntity;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({
        type: 'int',
        name: 'resources_id',
        comment: '关联到resources表主键id',
    }),
    __metadata("design:type", Number)
], RoleResourcesEntity.prototype, "resourcesId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        name: 'role_id',
        comment: '关联到role表主键id',
    }),
    __metadata("design:type", Number)
], RoleResourcesEntity.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'tinyint',
        name: 'type',
        default: '0',
        comment: '类型,0表示菜单1表示按钮',
    }),
    __metadata("design:type", Number)
], RoleResourcesEntity.prototype, "type", void 0);
exports.RoleResourcesEntity = RoleResourcesEntity = __decorate([
    (0, typeorm_1.Entity)('role_resources')
], RoleResourcesEntity);
//# sourceMappingURL=role.resources.entity.js.map