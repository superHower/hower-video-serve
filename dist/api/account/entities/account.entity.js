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
exports.AccountEntity = void 0;
const base_entity_1 = require("../../../shared/entities/base.entity");
const typeorm_1 = require("typeorm");
let AccountEntity = class AccountEntity extends base_entity_1.SharedEntity {
};
exports.AccountEntity = AccountEntity;
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        name: 'username',
        nullable: true,
        comment: '账号',
    }),
    __metadata("design:type", String)
], AccountEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        name: 'password',
        comment: '密码',
    }),
    __metadata("design:type", String)
], AccountEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'tinyint',
        name: 'account_type',
        nullable: true,
        default: '0',
        comment: '账号类型:0普通账号,1是主账号,2是超管',
    }),
    __metadata("design:type", Number)
], AccountEntity.prototype, "accountType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        name: 'tenant_id',
        comment: '关联到tenant表主键id',
    }),
    __metadata("design:type", Number)
], AccountEntity.prototype, "tenantId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        name: 'parent_id',
        nullable: true,
        default: '-1',
        comment: '自关联主键id',
    }),
    __metadata("design:type", Number)
], AccountEntity.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        name: 'department_id',
        nullable: true,
        default: '-1',
        comment: '部门名称',
    }),
    __metadata("design:type", Number)
], AccountEntity.prototype, "departmentId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        name: 'sort',
        nullable: true,
        default: '1',
        comment: '排序',
    }),
    __metadata("design:type", Number)
], AccountEntity.prototype, "sort", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'tinyint',
        name: 'status',
        nullable: true,
        default: '0',
        comment: '状态0是正常,1是禁用',
    }),
    __metadata("design:type", Number)
], AccountEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 30,
        name: 'last_login_ip',
        nullable: true,
        comment: '最后登录ip地址',
    }),
    __metadata("design:type", String)
], AccountEntity.prototype, "lastLoginIp", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        name: 'last_login_nation',
        nullable: true,
        comment: '最后登录国家',
    }),
    __metadata("design:type", String)
], AccountEntity.prototype, "lastLoginNation", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        name: 'last_login_province',
        nullable: true,
        comment: '最后登录省份',
    }),
    __metadata("design:type", String)
], AccountEntity.prototype, "lastLoginProvince", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        name: 'last_login_city',
        nullable: true,
        comment: '最后登录城市',
    }),
    __metadata("design:type", String)
], AccountEntity.prototype, "lastLoginCity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        name: 'last_login_district',
        nullable: true,
        comment: '最后登录地区',
    }),
    __metadata("design:type", String)
], AccountEntity.prototype, "lastLoginDistrict", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        name: 'last_login_adcode',
        nullable: true,
        comment: '最后登录行政区划代码',
    }),
    __metadata("design:type", String)
], AccountEntity.prototype, "lastLoginAdcode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        name: 'last_login_date',
        nullable: true,
        comment: '最后登录时间',
    }),
    __metadata("design:type", Date)
], AccountEntity.prototype, "lastLoginDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 30,
        name: 'salt',
        nullable: true,
        comment: '密码盐',
    }),
    __metadata("design:type", String)
], AccountEntity.prototype, "salt", void 0);
exports.AccountEntity = AccountEntity = __decorate([
    (0, typeorm_1.Entity)('account')
], AccountEntity);
//# sourceMappingURL=account.entity.js.map