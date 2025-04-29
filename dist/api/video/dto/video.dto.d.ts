import { QueryOptionsDto } from '@src/shared/dto/query.options.dto';
export declare class VideoDto {
    title: string;
    description?: string;
    videoUrl: string;
    coverUrl?: string;
    duration?: number;
    fileSize?: number;
    tags?: string;
    status?: number;
}
export declare class QueryVideoDto extends QueryOptionsDto {
    title?: string;
    accountId?: number;
    status?: number;
    type?: number;
    tags?: string;
    isHot?: boolean;
}
export declare class PlayDto {
    videoId?: number;
    ipAddress?: string;
    agent?: string;
}
