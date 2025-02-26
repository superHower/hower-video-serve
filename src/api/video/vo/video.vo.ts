import { QueryListVo } from '@src/shared/vo/query.list.vo';
import { QueryVo } from '@src/shared/vo/query.vo';

export class VideoVo extends QueryVo {
  readonly title!: string; // 视频标题
  readonly description!: string; // 视频描述
  readonly coverUrl!: string | null; // 封面地址
  readonly videoUrl!: string; // 视频地址

  readonly duration!: number; // 视频时长(秒)
  readonly fileSize!: number; // 文件大小(字节)
  readonly tags!: number; // 改为数组类型
  readonly status!: number; // 明确声明 status 字段的类型

  readonly accountId!: number; // 账户Id

  // 虚拟统计字段
  readonly playCount!: number; // 从统计表获取
  readonly likeCount!: number; // 从统计表获取
  readonly favoriteCount!: number; // 从统计表获取
  readonly commentCount!: number; // 新增评论数

  // 互动状态（需要后处理）
  readonly isLiked?: boolean; // 当前用户是否点赞
  readonly isCollected?: boolean; // 当前用户是否收藏
}

export class VideoPageVo extends QueryListVo {
  readonly data!: VideoVo[];
}
