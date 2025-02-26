import { UploadOssService } from '../../plugin/file/upload-oss.service';
import { VerifyDto, MergeDto } from './dto/upload.dto';
export declare class UploadController {
    private readonly uploadOssService;
    constructor(uploadOssService: UploadOssService);
    uploadSingleFile(file: Express.Multer.File): Promise<any>;
    uploadMultipleFiles(files: Array<Express.Multer.File>): Promise<any[]>;
    verifyFile(req: VerifyDto): Promise<{
        data: {
            code: string;
            data: {
                neededFileList: number[];
            };
        };
    }>;
    uploadChunk(chunk: Express.Multer.File, body: {
        chunkIndex: string;
        fileHash: string;
        extname: string;
    }): Promise<any>;
    mergeFile(req: MergeDto): Promise<{
        data: {
            code: string;
            data: {
                neededFileList: never[];
                message: string;
                filePath: string;
            };
            message?: undefined;
        };
    } | {
        data: {
            code: string;
            data: null;
            message: string;
        };
    } | {
        data: {
            code: string;
            data: {
                filePath: string;
            };
            message: string;
        };
    }>;
}
