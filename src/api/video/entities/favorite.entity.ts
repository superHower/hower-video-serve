import { Entity, Column } from 'typeorm';
import { SharedEntity } from '@src/shared/entities/base.entity';

@Entity('video_favorite')
export class FavoriteEntity extends SharedEntity {
  @Column('int', { name: 'video_id' }) videoId!: number;
  @Column('int', { name: 'account_id', default: 1, comment: '点赞者' }) accountId!: number;
}
