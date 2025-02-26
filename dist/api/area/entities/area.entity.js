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
exports.AreaEntity = void 0;
const typeorm_1 = require("typeorm");
let AreaEntity = class AreaEntity extends typeorm_1.BaseEntity {
};
exports.AreaEntity = AreaEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'int',
        name: 'id',
        comment: '主键id',
    }),
    __metadata("design:type", Number)
], AreaEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        name: 'pid',
        nullable: true,
        comment: '父id',
    }),
    __metadata("design:type", Number)
], AreaEntity.prototype, "pid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        name: 'shortname',
        nullable: true,
        comment: '简称',
    }),
    __metadata("design:type", String)
], AreaEntity.prototype, "shortname", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        name: 'name',
        nullable: true,
        comment: '名称',
    }),
    __metadata("design:type", String)
], AreaEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        name: 'merger_name',
        nullable: true,
        comment: '全称',
    }),
    __metadata("design:type", String)
], AreaEntity.prototype, "mergerName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'tinyint',
        name: 'level',
        nullable: true,
        comment: '层级 0 1 2 省市区县',
    }),
    __metadata("design:type", Number)
], AreaEntity.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        name: 'pinyin',
        nullable: true,
        comment: '拼音',
    }),
    __metadata("design:type", String)
], AreaEntity.prototype, "pinyin", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        name: 'code',
        nullable: true,
        comment: '长途区号',
    }),
    __metadata("design:type", String)
], AreaEntity.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        name: 'zip_code',
        nullable: true,
        comment: '邮编',
    }),
    __metadata("design:type", String)
], AreaEntity.prototype, "zipCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        name: 'first',
        nullable: true,
        comment: '首字母',
    }),
    __metadata("design:type", String)
], AreaEntity.prototype, "first", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        name: 'lng',
        nullable: true,
        comment: '经度',
    }),
    __metadata("design:type", String)
], AreaEntity.prototype, "lng", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        name: 'lat',
        nullable: true,
        comment: '纬度',
    }),
    __metadata("design:type", String)
], AreaEntity.prototype, "lat", void 0);
exports.AreaEntity = AreaEntity = __decorate([
    (0, typeorm_1.Entity)('area')
], AreaEntity);
//# sourceMappingURL=area.entity.js.map