import { Entity, Column } from 'typeorm';
import { SharedEntity } from '@src/shared/entities/base.entity';

@Entity('video_play')
export class PlayEntity extends SharedEntity {
  @Column('int', { name: 'video_id' }) videoId!: number;
  @Column('varchar', { name: 'ip_address' }) ipAddress!: string;
  @Column('varchar', { name: 'user_agent' }) agent!: string;
}
