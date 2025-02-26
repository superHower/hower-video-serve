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
exports.ResourcesEntity = void 0;
const method_enum_1 = require("../../../enums/method.enum");
const base_entity_1 = require("../../../shared/entities/base.entity");
const typeorm_1 = require("typeorm");
let ResourcesEntity = class ResourcesEntity extends base_entity_1.SharedEntity {
};
exports.ResourcesEntity = ResourcesEntity;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        name: 'title',
        comment: '按钮标题,或菜单标题',
    }),
    __metadata("design:type", String)
], ResourcesEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        name: 'url',
        comment: '按钮请求url,或菜单路由',
    }),
    __metadata("design:type", String)
], ResourcesEntity.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        name: 'method',
        nullable: true,
        comment: '接口的请求方式',
    }),
    __metadata("design:type", String)
], ResourcesEntity.prototype, "method", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        name: 'icon',
        nullable: true,
        comment: '菜单小图标',
    }),
    __metadata("design:type", String)
], ResourcesEntity.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'tinyint',
        name: 'resources_type',
        nullable: true,
        default: '0',
        comment: '0目录,1菜单,2接口',
    }),
    __metadata("design:type", Number)
], ResourcesEntity.prototype, "resourcesType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        name: 'parent_id',
        default: '-1',
        comment: '上一级id',
    }),
    __metadata("design:type", Number)
], ResourcesEntity.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        name: 'sort',
        nullable: true,
        default: '1',
        comment: '菜单,或按钮排序',
    }),
    __metadata("design:type", Number)
], ResourcesEntity.prototype, "sort", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'tinyint',
        name: 'status',
        nullable: true,
        default: '0',
        comment: '状态0是正常,1是禁用',
    }),
    __metadata("design:type", Number)
], ResourcesEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 200,
        name: 'description',
        nullable: true,
        comment: '描述',
    }),
    __metadata("design:type", String)
], ResourcesEntity.prototype, "description", void 0);
exports.ResourcesEntity = ResourcesEntity = __decorate([
    (0, typeorm_1.Entity)('resources')
], ResourcesEntity);
//# sourceMappingURL=resources.entity.js.map