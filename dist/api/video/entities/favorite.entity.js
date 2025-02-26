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
exports.FavoriteEntity = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../shared/entities/base.entity");
let FavoriteEntity = class FavoriteEntity extends base_entity_1.SharedEntity {
};
exports.FavoriteEntity = FavoriteEntity;
__decorate([
    (0, typeorm_1.Column)('int', { name: 'video_id' }),
    __metadata("design:type", Number)
], FavoriteEntity.prototype, "videoId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'account_id', default: 1, comment: '点赞者' }),
    __metadata("design:type", Number)
], FavoriteEntity.prototype, "accountId", void 0);
exports.FavoriteEntity = FavoriteEntity = __decorate([
    (0, typeorm_1.Entity)('video_favorite')
], FavoriteEntity);
//# sourceMappingURL=favorite.entity.js.map