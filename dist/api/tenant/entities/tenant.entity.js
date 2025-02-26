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
exports.TenantEntity = void 0;
const base_entity_1 = require("../../../shared/entities/base.entity");
const typeorm_1 = require("typeorm");
let TenantEntity = class TenantEntity extends base_entity_1.SharedEntity {
};
exports.TenantEntity = TenantEntity;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        name: 'name',
        comment: '商户名称',
    }),
    __metadata("design:type", String)
], TenantEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        name: 'username',
        nullable: true,
        comment: '商户联系人',
    }),
    __metadata("design:type", String)
], TenantEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        name: 'mobile',
        nullable: true,
        comment: '手机号码',
    }),
    __metadata("design:type", String)
], TenantEntity.prototype, "mobile", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
        name: 'balance',
        nullable: true,
        default: '0.00',
        comment: '余额',
    }),
    __metadata("design:type", Number)
], TenantEntity.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
        name: 'expire_time',
        comment: '过期时间',
    }),
    __metadata("design:type", Date)
], TenantEntity.prototype, "expireTime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'tinyint',
        name: 'status',
        nullable: true,
        default: '0',
        comment: '状态,0表示正常,1表示禁止',
    }),
    __metadata("design:type", Number)
], TenantEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        name: 'province_id',
        nullable: true,
        comment: '省份id',
    }),
    __metadata("design:type", Number)
], TenantEntity.prototype, "provinceId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        name: 'city_id',
        nullable: true,
        comment: '市id',
    }),
    __metadata("design:type", Number)
], TenantEntity.prototype, "cityId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        name: 'area_id',
        nullable: true,
        comment: '地区id',
    }),
    __metadata("design:type", Number)
], TenantEntity.prototype, "areaId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 200,
        name: 'address',
        nullable: true,
        comment: '具体地址',
    }),
    __metadata("design:type", String)
], TenantEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        name: 'sort',
        nullable: true,
        default: '1',
        comment: '排序',
    }),
    __metadata("design:type", Number)
], TenantEntity.prototype, "sort", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        name: 'description',
        nullable: true,
        comment: '描述',
    }),
    __metadata("design:type", String)
], TenantEntity.prototype, "description", void 0);
exports.TenantEntity = TenantEntity = __decorate([
    (0, typeorm_1.Entity)('tenant')
], TenantEntity);
//# sourceMappingURL=tenant.entity.js.map