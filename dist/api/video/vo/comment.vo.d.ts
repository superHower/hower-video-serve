import { QueryListVo } from '@src/shared/vo/query.list.vo';
import { QueryVo } from '@src/shared/vo/query.vo';
export declare class CommentVo extends QueryVo {
    readonly parentId: string;
    readonly content: string;
}
export declare class CommentPageVo extends QueryListVo {
    readonly data: CommentVo[];
}
