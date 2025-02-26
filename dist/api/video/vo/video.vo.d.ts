import { QueryListVo } from '@src/shared/vo/query.list.vo';
import { QueryVo } from '@src/shared/vo/query.vo';
export declare class VideoVo extends QueryVo {
    readonly title: string;
    readonly description: string;
    readonly coverUrl: string | null;
    readonly videoUrl: string;
    readonly duration: number;
    readonly fileSize: number;
    readonly tags: number;
    readonly status: number;
    readonly accountId: number;
    readonly playCount: number;
    readonly likeCount: number;
    readonly favoriteCount: number;
    readonly commentCount: number;
    readonly isLiked?: boolean;
    readonly isCollected?: boolean;
}
export declare class VideoPageVo extends QueryListVo {
    readonly data: VideoVo[];
}
