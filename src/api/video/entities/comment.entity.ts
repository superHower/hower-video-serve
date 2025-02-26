import { Entity, Column } from 'typeorm';
import { SharedEntity } from '@src/shared/entities/base.entity';

@Entity('video_comment')
export class CommentEntity extends SharedEntity {
  @Column('int', { name: 'video_id' })
  videoId!: number;
  @Column('int', { name: 'account_id', default: 1, comment: '点赞者' })
  accountId!: number;
  @Column('varchar')
  username!: string;

  @Column('bigint', { name: 'parent_id', nullable: true })
  parentId?: number;
  @Column('varchar', { length: 2000 })
  content!: string;
}
