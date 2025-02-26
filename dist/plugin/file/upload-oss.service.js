"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadOssService = void 0;
const path = __importStar(require("path"));
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs/promises"));
const fs_1 = require("fs");
const url_1 = require("../../utils/url");
const moment_1 = __importDefault(require("moment"));
const OSS = require('ali-oss');
const config_1 = require("@nestjs/config");
let UploadOssService = class UploadOssService {
    constructor(configService) {
        this.configService = configService;
    }
    onModuleInit() {
        this.client = new OSS({
            accessKeyId: this.configService.get('aliyunOss.accessKeyId'),
            accessKeySecret: this.configService.get('aliyunOss.accessKeySecret'),
            region: this.configService.get('aliyunOss.endpointUrl'),
            bucket: this.configService.get('aliyunOss.bucketName'),
            secure: true,
        });
    }
    async uploadFile(file) {
        return await this.process(file);
    }
    async uploadFiles(files) {
        const filenameList = [];
        for (const file of files) {
            const result = await this.process(file);
            filenameList.push(result);
        }
        return filenameList;
    }
    async process(file) {
        console.log('输出', file);
        const fileSize = Number(file.size) / 1000 / 1000;
        const defaultSize = this.configService.get('aliyunOss.OssDefaultSize');
        if (fileSize > defaultSize) {
            throw new common_1.HttpException(`你上传的文件体积大于 ${defaultSize}M，请先选择在线压缩工具压缩后上传`, common_1.HttpStatus.OK);
        }
        const extname = path.extname(file.originalname).toLocaleLowerCase();
        const filename = `${Date.now()}${Number.parseInt(String(Math.random() * 1000), 10)}${extname}`;
        const typeList = ['.png', '.jpg', '.gif', '.jpeg'];
        if (typeList &&
            typeList.length &&
            !typeList.map((item) => item.toLocaleLowerCase()).includes(extname)) {
            throw new common_1.HttpException(`上传图片格式限制为:[${typeList}]其中一种,你上传的图片格式里包含了:${extname}`, common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        const filePath = path.join('image', (0, moment_1.default)(Date.now()).format('YYYY-MM-DD'));
        const target = path.join(filePath, filename);
        const result = await this.client.put(target, file.buffer);
        return { data: { url: result.url, fileName: file.originalname, fileSize: file.size } };
    }
    async verifyFile(fileHash, totalCount, extname) {
        const fileSuffix = (0, url_1.getFileSuffixByName)(extname);
        const dirPath = path.join(process.cwd(), `/uploads/${fileSuffix}/${fileHash}`);
        const filePath = dirPath + '.' + extname;
        const fileDBPath = `/uploads/${fileSuffix}/${fileHash}.${extname}`;
        let res = Array(totalCount)
            .fill(0)
            .map((_, index) => index + 1);
        try {
            await fs.stat(filePath);
            const data = {
                neededFileList: [],
                message: '该文件已被上传',
                filePath: fileDBPath,
            };
            return { data: { code: 'FILE_EXIST', data } };
        }
        catch (fileError) {
            try {
                await fs.stat(dirPath);
                const files = await fs.readdir(dirPath);
                if (files.length < totalCount) {
                    res = res.filter((fileIndex) => {
                        return !files.includes(`chunk-${fileIndex}`);
                    });
                    const data = { neededFileList: res };
                    return { data: { code: 'SUCCESS', data } };
                }
                else {
                    const data = {
                        neededFileList: [],
                        message: '已完成所有分片上传，请合并文件',
                        filePath: fileDBPath,
                    };
                    return { data: { code: 'ALL_CHUNK_UPLOAD', data } };
                }
            }
            catch (dirError) {
                const data = { neededFileList: res };
                return { data: { code: 'SUCCESS', data } };
            }
        }
    }
    async uploadChunk(params) {
        const { chunk, fileHash, chunkIndex, extname } = params;
        if (!(chunk === null || chunk === void 0 ? void 0 : chunk.buffer) || !fileHash || chunkIndex < 1) {
            throw new common_1.BadRequestException('无效的分片参数');
        }
        const fileSuffix = (0, url_1.getFileSuffixByName)(extname);
        const dirPath = path.join(process.cwd(), 'uploads', fileSuffix, fileHash);
        const chunkPath = path.join(dirPath, `${fileHash}-${chunkIndex}.part`);
        try {
            try {
                await fs.access(chunkPath);
                return { data: { code: 'CHUNK_EXIST', message: '分片已存在' } };
            }
            catch (error) {
                await fs.mkdir(dirPath, { recursive: true });
                await fs.writeFile(chunkPath, chunk.buffer);
                const savedBuffer = await fs.readFile(chunkPath);
                if (!savedBuffer.equals(chunk.buffer)) {
                    await fs.unlink(chunkPath);
                    throw new Error('分片写入校验失败');
                }
                return { data: { code: 'SUCCESS', message: '上传分片成功' } };
            }
        }
        catch (error) {
            console.error(`[ERROR] 分片处理失败`, { fileHash, chunkIndex, error });
            return {
                data: {
                    code: 'UPLOAD_FAIL',
                    message: '分片上传失败',
                },
            };
        }
    }
    async mergeFile(fileHash, extname) {
        const fileSuffix = (0, url_1.getFileSuffixByName)(extname);
        const dirPath = path.join(process.cwd(), `/uploads/${fileSuffix}/${fileHash}`);
        const filePath = dirPath + '.' + extname;
        const fileDBPath = `/uploads/${fileSuffix}/${fileHash}.${extname}`;
        try {
            await fs.access(filePath);
            const data = {
                neededFileList: [],
                message: '该文件已被上传',
                filePath: fileDBPath,
            };
            return { data: { code: 'FILE_EXIST', data } };
        }
        catch (error) {
        }
        const writeStream = (0, fs_1.createWriteStream)(filePath);
        try {
            const files = await fs.readdir(dirPath);
            files.sort((a, b) => {
                var _a, _b;
                const indexA = parseInt((_a = a.split('-').pop()) !== null && _a !== void 0 ? _a : '0');
                const indexB = parseInt((_b = b.split('-').pop()) !== null && _b !== void 0 ? _b : '0');
                return indexA - indexB;
            });
            for (let index = 0; index < files.length; index++) {
                const filename = files[index];
                const curFilePath = path.join(dirPath, filename);
                const readStream = (0, fs_1.createReadStream)(curFilePath);
                const isLastChunk = index === files.length - 1;
                await new Promise((resolve, reject) => {
                    readStream.pipe(writeStream, { end: isLastChunk });
                    readStream.on('end', resolve);
                    readStream.on('error', reject);
                });
            }
            console.log('合并完毕');
        }
        catch (error) {
            console.error('读取目录失败:', error);
            return { data: { code: 'FAIL', data: null, message: '文件合并失败' } };
        }
        try {
            const files = await fs.readdir(dirPath);
            await Promise.all(files.map((file) => fs.unlink(path.join(dirPath, file))));
            await fs.rmdir(dirPath);
            console.log('文件夹删除成功');
        }
        catch (error) {
            console.error('移除文件夹错误：', error);
        }
        return { data: { code: 'SUCCESS', data: { filePath: fileDBPath }, message: '文件合并成功' } };
    }
};
exports.UploadOssService = UploadOssService;
exports.UploadOssService = UploadOssService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UploadOssService);
//# sourceMappingURL=upload-oss.service.js.map