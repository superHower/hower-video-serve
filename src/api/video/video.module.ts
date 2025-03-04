import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ADMIN_PREFIX } from '@src/constants';

import { VideoEntity } from './entities/video.entity';
import { CommentEntity } from './entities/comment.entity';
import { LikeEntity } from './entities/like.entity';
import { FavoriteEntity } from './entities/favorite.entity';
import { PlayEntity } from './entities/play.entity';

import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { CommentGateway } from '../../event/comment.gateway';

@Module({
  imports: [
    RouterModule.register([
      {
        path: ADMIN_PREFIX, // 保持相同的路由前缀
        module: VideoModule,
      },
    ]),
    TypeOrmModule.forFeature([VideoEntity, CommentEntity, LikeEntity, FavoriteEntity, PlayEntity]), // 注册视频实体
  ],
  controllers: [VideoController], // 声明控制器
  providers: [VideoService, CommentGateway], // 注册服务
})
export class VideoModule {}
