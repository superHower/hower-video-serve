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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../decorators");
const auth_guard_1 = require("../../guard/auth.guard");
const video_dto_1 = require("./dto/video.dto");
const comment_dto_1 = require("./dto/comment.dto");
const video_service_1 = require("./video.service");
let VideoController = class VideoController {
    constructor(videoService) {
        this.videoService = videoService;
    }
    async createVideoApi(req, currentInfo) {
        return await this.videoService.createVideoApi(req, currentInfo);
    }
    async createCommentApi(req, currentInfo) {
        return this.videoService.createCommentApi(req, currentInfo);
    }
    async playVideoApi(req) {
        return this.videoService.playVideoApi(req);
    }
    async getLikeApi(id, user) {
        return this.videoService.getLikeApi(id, user.id);
    }
    async getFavoriteApi(id, user) {
        return this.videoService.getFavoriteApi(id, user.id);
    }
    async deleteVideoByIdApi(id) {
        return await this.videoService.deleteVideoByIdApi(id);
    }
    async batchDeleteVideoByIdListApi(idList) {
        return await this.videoService.batchDeleteVideoByIdListApi(idList);
    }
    async deleteCommentByIdApi(id, user) {
        return await this.videoService.deleteCommentByIdApi(id, user.id);
    }
    async batchDeleteCommentByIdListApi(idList) {
        return await this.videoService.batchDeleteCommentByIdListApi(idList);
    }
    async modifyVideoStatusByIdApi(id) {
        return await this.videoService.modifyVideoStatusByIdApi(id);
    }
    async modifyVideoByIdApi(id, req) {
        return await this.videoService.modifyVideoByIdApi(id, req);
    }
    async batchModifyVideoStatusByIdApi(idList) {
        return await this.videoService.batchModifyVideoStatusByIdApi(idList);
    }
    async getVideoPageApi(queryOption) {
        console.log('controller', queryOption);
        return await this.videoService.getVideoPageApi(queryOption);
    }
    async getVideoByIdApi(id, user) {
        return await this.videoService.getVideoByIdApi(id, user.id);
    }
    async getCommentsApi(queryOption) {
        console.log('controller', queryOption);
        return await this.videoService.getCommentsApi(queryOption);
    }
};
exports.VideoController = VideoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.CurrentUser)('userInfo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [video_dto_1.VideoDto, Object]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "createVideoApi", null);
__decorate([
    (0, common_1.Post)('comment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.CurrentUser)('userInfo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.CreateCommentDto, Object]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "createCommentApi", null);
__decorate([
    (0, common_1.Post)('play'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [video_dto_1.PlayDto]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "playVideoApi", null);
__decorate([
    (0, common_1.Get)(':id/like'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __param(1, (0, decorators_1.CurrentUser)('userInfo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getLikeApi", null);
__decorate([
    (0, common_1.Get)(':id/favorite'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __param(1, (0, decorators_1.CurrentUser)('userInfo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getFavoriteApi", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "deleteVideoByIdApi", null);
__decorate([
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "batchDeleteVideoByIdListApi", null);
__decorate([
    (0, common_1.Delete)(':id/comment'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __param(1, (0, decorators_1.CurrentUser)('userInfo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "deleteCommentByIdApi", null);
__decorate([
    (0, common_1.Post)('comment/delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "batchDeleteCommentByIdListApi", null);
__decorate([
    (0, common_1.Put)('/status/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "modifyVideoStatusByIdApi", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, video_dto_1.VideoDto]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "modifyVideoByIdApi", null);
__decorate([
    (0, common_1.Post)('/batchStatus'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "batchModifyVideoStatusByIdApi", null);
__decorate([
    (0, common_1.Post)('/list'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [video_dto_1.QueryVideoDto]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getVideoPageApi", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __param(1, (0, decorators_1.CurrentUser)('userInfo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getVideoByIdApi", null);
__decorate([
    (0, common_1.Post)('/comment/list'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.QueryCommentDto]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "getCommentsApi", null);
exports.VideoController = VideoController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('video'),
    __metadata("design:paramtypes", [video_service_1.VideoService])
], VideoController);
//# sourceMappingURL=video.controller.js.map