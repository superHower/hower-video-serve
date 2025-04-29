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
exports.VideoEntity = void 0;
const base_entity_1 = require("../../../shared/entities/base.entity");
const typeorm_1 = require("typeorm");
let VideoEntity = class VideoEntity extends base_entity_1.SharedEntity {
};
exports.VideoEntity = VideoEntity;
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, comment: '视频标题' }),
    __metadata("design:type", String)
], VideoEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true, comment: '视频描述' }),
    __metadata("design:type", Object)
], VideoEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'video_url', length: 512, comment: '视频文件URL' }),
    __metadata("design:type", String)
], VideoEntity.prototype, "videoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)('mediumtext', { name: 'cover_url', nullable: true, comment: '封面图URL' }),
    __metadata("design:type", Object)
], VideoEntity.prototype, "coverUrl", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { default: 0, comment: '视频时长(秒)' }),
    __metadata("design:type", Number)
], VideoEntity.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint', { name: 'file_size', default: 0, comment: '文件大小(字节)' }),
    __metadata("design:type", Number)
], VideoEntity.prototype, "fileSize", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 255, comment: '视频标签' }),
    __metadata("design:type", Object)
], VideoEntity.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)('tinyint', { default: 0, comment: '状态:0-正常,1-下架,2-审核中' }),
    __metadata("design:type", Number)
], VideoEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'account_id', default: 1, comment: '发布者ID' }),
    __metadata("design:type", Number)
], VideoEntity.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'play_cnt', default: 0, comment: '播放数' }),
    __metadata("design:type", Number)
], VideoEntity.prototype, "playCount", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'like_cnt', default: 0, comment: '点赞数' }),
    __metadata("design:type", Number)
], VideoEntity.prototype, "likeCount", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'favorite_cnt', default: 0, comment: '收藏数' }),
    __metadata("design:type", Number)
], VideoEntity.prototype, "favoriteCount", void 0);
exports.VideoEntity = VideoEntity = __decorate([
    (0, typeorm_1.Entity)('video')
], VideoEntity);
//# sourceMappingURL=video.entity.js.map