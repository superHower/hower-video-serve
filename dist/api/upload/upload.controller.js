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
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const upload_oss_service_1 = require("../../plugin/file/upload-oss.service");
const upload_dto_1 = require("./dto/upload.dto");
const common_2 = require("@nestjs/common");
let UploadController = class UploadController {
    constructor(uploadOssService) {
        this.uploadOssService = uploadOssService;
    }
    async uploadSingleFile(file) {
        if (!file)
            throw new common_1.BadRequestException('没有文件上传.');
        return await this.uploadOssService.uploadFile(file);
    }
    async uploadMultipleFiles(files) {
        if (!files || files.length === 0)
            throw new common_1.BadRequestException('没有文件上传.');
        return await this.uploadOssService.uploadFiles(files);
    }
    async verifyFile(req) {
        const { fileHash, totalCount, extname } = req;
        return await this.uploadOssService.verifyFile(fileHash, totalCount, extname);
    }
    async uploadChunk(chunk, body) {
        console.log('输出', chunk);
        if (!chunk)
            throw new common_1.BadRequestException('没有分片文件上传.');
        return await this.uploadOssService.uploadChunk({
            chunk,
            chunkIndex: parseInt(body.chunkIndex),
            fileHash: body.fileHash,
            extname: body.extname,
        });
    }
    async mergeFile(req) {
        const { fileHash, extname } = req;
        return await this.uploadOssService.mergeFile(fileHash, extname);
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)('single'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadSingleFile", null);
__decorate([
    (0, common_1.Post)('multiple'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadMultipleFiles", null);
__decorate([
    (0, common_1.Post)('verify'),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [upload_dto_1.VerifyDto]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "verifyFile", null);
__decorate([
    (0, common_1.Post)('chunk'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('chunk')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadChunk", null);
__decorate([
    (0, common_1.Post)('merge'),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [upload_dto_1.MergeDto]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "mergeFile", null);
exports.UploadController = UploadController = __decorate([
    (0, common_1.Controller)('upload'),
    __metadata("design:paramtypes", [upload_oss_service_1.UploadOssService])
], UploadController);
//# sourceMappingURL=upload.controller.js.map