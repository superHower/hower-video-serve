import { QueryOptionsDto } from '@src/shared/dto/query.options.dto';
export declare class VideoDto {
    title: string;
    description?: string;
    videoUrl: string;
    coverUrl?: string;
    duration?: number;
    fileSize?: number;
    tags?: number;
    status?: number;
}
export declare class QueryVideoDto extends QueryOptionsDto {
    title?: string;
    accountId?: number;
    status?: number;
    tags?: number;
}
export declare class PlayDto {
    videoId?: number;
    ipAddress?: string;
    agent?: string;
}
