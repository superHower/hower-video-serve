import { SharedEntity } from '@src/shared/entities/base.entity';
export declare class CommentEntity extends SharedEntity {
    videoId: number;
    accountId: number;
    username: string;
    parentId?: number;
    content: string;
}
