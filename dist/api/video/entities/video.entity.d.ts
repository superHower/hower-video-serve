import { SharedEntity } from '@src/shared/entities/base.entity';
export declare class VideoEntity extends SharedEntity {
    title: string;
    description: string | null;
    videoUrl: string;
    coverUrl: string | null;
    duration: number;
    fileSize: number;
    tags: string | null;
    status: number;
    accountId: number;
    playCount?: number;
    likeCount?: number;
    favoriteCount?: number;
}
