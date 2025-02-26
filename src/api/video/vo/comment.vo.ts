import { QueryListVo } from '@src/shared/vo/query.list.vo';
import { QueryVo } from '@src/shared/vo/query.vo';

export class CommentVo extends QueryVo {
  readonly parentId!: string; // 视频标题
  readonly content!: string; // 视频描述
}

export class CommentPageVo extends QueryListVo {
  readonly data!: CommentVo[];
}
