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
exports.PlayEntity = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../shared/entities/base.entity");
let PlayEntity = class PlayEntity extends base_entity_1.SharedEntity {
};
exports.PlayEntity = PlayEntity;
__decorate([
    (0, typeorm_1.Column)('int', { name: 'video_id' }),
    __metadata("design:type", Number)
], PlayEntity.prototype, "videoId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'ip_address' }),
    __metadata("design:type", String)
], PlayEntity.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'user_agent' }),
    __metadata("design:type", String)
], PlayEntity.prototype, "agent", void 0);
exports.PlayEntity = PlayEntity = __decorate([
    (0, typeorm_1.Entity)('video_play')
], PlayEntity);
//# sourceMappingURL=play.entity.js.map