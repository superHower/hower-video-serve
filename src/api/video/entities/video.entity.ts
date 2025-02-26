import { SharedEntity } from '@src/shared/entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity('video')
export class VideoEntity extends SharedEntity {
  // 保留基础字段
  @Column('varchar', { length: 255, comment: '视频标题' })
  title!: string;

  @Column('text', { nullable: true, comment: '视频描述' })
  description!: string | null;

  @Column('varchar', { name: 'video_url', length: 512, comment: '视频文件URL' })
  videoUrl!: string;

  @Column('varchar', { name: 'cover_url', length: 512, nullable: true, comment: '封面图URL' })
  coverUrl!: string | null;

  // 保留媒体属性
  @Column('int', { default: 0, comment: '视频时长(秒)' })
  duration!: number;

  @Column('bigint', { name: 'file_size', default: 0, comment: '文件大小(字节)' })
  fileSize!: number;

  // 标签改为JSON格式存储
  @Column('tinyint', { default: 0, comment: '视频标签' })
  tags!: number | null;

  // 状态枚举
  @Column('tinyint', { default: 0, comment: '状态:0-正常,1-下架,2-审核中' })
  status!: number;

  @Column('int', { name: 'account_id', default: 1, comment: '发布者ID' })
  accountId!: number;

  @Column('int', { name: 'play_cnt', default: 0, comment: '播放数' })
  playCount?: number;

  @Column('int', { name: 'like_cnt', default: 0, comment: '点赞数' })
  likeCount?: number;

  @Column('int', { name: 'favorite_cnt', default: 0, comment: '收藏数' })
  favoriteCount?: number;
}
