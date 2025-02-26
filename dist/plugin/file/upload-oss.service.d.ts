import { ConfigService } from '@nestjs/config';
export declare class UploadOssService {
    private readonly configService;
    private client;
    constructor(configService: ConfigService);
    onModuleInit(): void;
    uploadFile(file: Express.Multer.File): Promise<any>;
    uploadFiles(files: Array<Express.Multer.File>): Promise<any[]>;
    private process;
    verifyFile(fileHash: string, totalCount: number, extname: string): Promise<{
        data: {
            code: string;
            data: {
                neededFileList: number[];
            };
        };
    }>;
    uploadChunk(params: {
        chunk: Express.Multer.File;
        chunkIndex: number;
        fileHash: string;
        extname: string;
    }): Promise<any>;
    mergeFile(fileHash: string, extname: string): Promise<{
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
