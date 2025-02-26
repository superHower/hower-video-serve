import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { mapToObj } from '@src/utils';
import { PageEnum, StatusEnum } from '@src/enums';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, FindOperator, ILike, In, IsNull, Repository, SelectQueryBuilder } from 'typeorm';
import { ICurrentUserType } from '@src/decorators';

import { VideoDto, QueryVideoDto, PlayDto } from './dto/video.dto';
import { CreateCommentDto, QueryCommentDto } from './dto/comment.dto';

import { VideoPageVo, VideoVo } from './vo/video.vo';
import { CommentPageVo } from './vo/comment.vo';

import { VideoEntity } from './entities/video.entity';
import { CommentEntity } from './entities/comment.entity';
import { LikeEntity } from './entities/like.entity';
import { PlayEntity } from './entities/play.entity';
import { FavoriteEntity } from './entities/favorite.entity';
import { AccountEntity } from '../account/entities/account.entity';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videoRepository: Repository<VideoEntity>,
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>,
    @InjectRepository(PlayEntity)
    private readonly playRepository: Repository<PlayEntity>,
    @InjectRepository(FavoriteEntity)
    private readonly favoriteRepository: Repository<FavoriteEntity>
  ) {}

  /**
   * @description: 创建视频
   */
  async createVideoApi(req: VideoDto, currentInfo: ICurrentUserType): Promise<string> {
    const { id } = currentInfo;
    console.log('当前用户ID', id);
    // 验证标题唯一性
    const videoEntity: Pick<VideoEntity, 'id'> | null = await this.videoRepository.findOne({
      where: { title: req.title, accountId: id },
      select: ['id'],
    });
    if (videoEntity) throw new HttpException(`视频[${req.title}]已存在`, HttpStatus.OK);

    const videoData = this.videoRepository.create({
      ...req,
      accountId: id,
      status: StatusEnum.PENDING,
    });
    await this.videoRepository.save(videoData);
    return '视频创建成功';
  }
  /**
   * @description: 创建评论
   */
  async createCommentApi(req: CreateCommentDto, currentInfo: ICurrentUserType): Promise<string> {
    const { id, username } = currentInfo;
    const commentData = this.commentRepository.create({
      ...req,
      accountId: id,
      username: username,
    });
    await this.commentRepository.save(commentData);
    return '评论创建成功';
  }
  /**
   * @description: 创建播放
   */
  async playVideoApi(req: PlayDto): Promise<string> {
    const playData = this.playRepository.create(req);
    await this.playRepository.save(playData);
    return '播放成功';
  }

  /**
   * @description: 点赞
   */
  async getLikeApi(vid: number, uid: number): Promise<string> {
    const likeData = await this.likeRepository.findOne({
      where: { videoId: vid, accountId: uid },
    });
    if (likeData) {
      await this.likeRepository.delete(likeData.id);
      return '取消点赞';
    } else {
      const likeData = this.likeRepository.create({ videoId: vid, accountId: uid });
      await this.likeRepository.save(likeData);
      return '点赞成功';
    }
  }
  /**
   * 收藏
   */
  async getFavoriteApi(vid: number, uid: number): Promise<string> {
    const favoriteData = await this.favoriteRepository.findOne({
      where: { videoId: vid, accountId: uid },
    });
    if (favoriteData) {
      await this.favoriteRepository.delete(favoriteData.id);
      return '取消收藏';
    } else {
      const favoriteData = this.favoriteRepository.create({ videoId: vid, accountId: uid });
      await this.favoriteRepository.save(favoriteData);

      return '收藏成功';
    }
  }

  /**
   * @description: 根据ID删除视频
   */
  async deleteVideoByIdApi(id: number): Promise<string> {
    const { affected } = await this.videoRepository.softDelete(id);
    return affected ? '删除成功' : '删除失败';
  }
  /**
   * @description: 批量删除视频
   */
  async batchDeleteVideoByIdListApi(idList: number[]): Promise<string> {
    const { affected } = await this.videoRepository.softDelete({ id: In(idList) });
    return affected ? `成功删除${affected}条数据` : '删除失败';
  }
  /**
   * @description: 批量删除评论
   */
  async batchDeleteCommentByIdListApi(idList: number[]): Promise<string> {
    const { affected } = await this.commentRepository.softDelete({ id: In(idList) });
    return affected ? `成功删除${affected}条数据` : '删除失败';
  }
  /**
   * @description: 根据ID删除评论
   */
  async deleteCommentByIdApi(vid: number, uid: number): Promise<string> {
    const commentEntity: Pick<CommentEntity, 'id'> | null = await this.commentRepository.findOne({
      where: { accountId: uid, videoId: vid },
      select: ['id'],
    });

    const { affected } = await this.commentRepository.softDelete(commentEntity!.id);
    return affected ? '删除成功' : '删除失败';
  }

  /**
   * @description: 切换视频状态
   */
  async modifyVideoStatusByIdApi(id: number): Promise<string> {
    const videoEntity: Pick<VideoEntity, 'status'> | null = await this.videoRepository.findOne({
      where: { id },
      select: ['status'],
    });

    if (!videoEntity) {
      throw new HttpException('视频不存在', HttpStatus.OK);
    }

    const newStatus =
      videoEntity.status === StatusEnum.NORMAL ? StatusEnum.FORBIDDEN : StatusEnum.NORMAL;

    const { affected } = await this.videoRepository.update(id, { status: newStatus });
    return affected ? '状态修改成功' : '状态修改失败';
  }

  /**
   * @description: 更新视频信息
   */
  async modifyVideoByIdApi(id: number, req: VideoDto): Promise<string> {
    const existVideo = await this.videoRepository.findOne({
      where: { title: req.title },
      select: ['id'],
    });

    if (existVideo && existVideo.id !== id) {
      throw new HttpException(`标题[${req.title}]已存在`, HttpStatus.OK);
    }

    const { affected } = await this.videoRepository.update(id, req);
    return affected ? '更新成功' : '更新失败';
  }

  /**
   * @description: 批量修改视频状态
   */
  async batchModifyVideoStatusByIdApi(idList: number[]): Promise<string> {
    const videos = await this.videoRepository.find({
      where: { id: In(idList) },
      select: ['id', 'status'],
    });

    const statusList = videos.map((item) => item.status);
    if ([...new Set(statusList)].length > 1) {
      throw new HttpException('当前传递的数据状态不统一,不能批量操作', HttpStatus.OK);
    }
    const { affected } = await this.videoRepository.update(idList, {
      status: statusList[0] == StatusEnum.NORMAL ? StatusEnum.FORBIDDEN : StatusEnum.NORMAL,
    });
    return affected ? '修改成功' : '修改失败';
  }
  /**
   * @Description: 根据id获取视频
   */
  async getVideoByIdApi(id: number): Promise<VideoVo | undefined> {
    const video = await this.queryVideoBuilder.where('video.id  = :id', { id }).getRawOne();

    const playCount = await this.playRepository.count({ where: { videoId: id } });
    return { ...video, playCount };
  }
  /**
   * @Description: 分页获取视频
   */
  async getVideoPageApi(queryOption: QueryVideoDto): Promise<VideoPageVo> {
    const {
      title,
      status,
      accountId,
      tags,
      pageNumber = PageEnum.PAGE_NUMBER,
      pageSize = PageEnum.PAGE_SIZE,
    } = queryOption;
    console.log('输出', queryOption);
    const query = new Map<string, FindOperator<string>>();
    if (title) {
      query.set('title', ILike(`%${title}%`));
    }
    if (accountId) {
      query.set('accountId', Equal(accountId + ''));
    }
    if (status! >= 0) {
      query.set('status', Equal(status + ''));
    }
    if (tags! >= 0) {
      query.set('tags', Equal(tags + ''));
    }
    query.set('deletedAt', IsNull());

    const queryBuilder = this.queryVideoBuilder;
    const data = await queryBuilder
      .where(mapToObj(query))
      .orderBy({ id: 'DESC' })
      .offset((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .printSql()
      .getRawMany();
    const total: number = await this.videoRepository
      .createQueryBuilder('video')
      .where(mapToObj(query))
      .getCount();
    return {
      data,
      total,
      pageNumber,
      pageSize,
    };
  }

  /**
   * @Description: 分页获取评论
   */

  async getCommentsApi(queryOption: QueryCommentDto): Promise<CommentPageVo> {
    const {
      videoId,
      pageNumber = PageEnum.PAGE_NUMBER,
      pageSize = PageEnum.PAGE_SIZE,
    } = queryOption;
    const query = new Map<string, FindOperator<string>>();
    if (videoId) {
      query.set('videoId', Equal(videoId + ''));
      query.set('deletedAt', IsNull());
    }
    const queryBuilder = this.queryCommentBuilder;
    const data = await queryBuilder
      .where(mapToObj(query))
      .orderBy({ id: 'DESC' })
      .offset((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .printSql()
      .getRawMany();
    const total: number = await this.commentRepository
      .createQueryBuilder('comment')
      .where(mapToObj(query))
      .getCount();

    return {
      data,
      total,
      pageNumber,
      pageSize,
    };
  }
  get queryVideoBuilder(): SelectQueryBuilder<VideoEntity> {
    return this.videoRepository
      .createQueryBuilder('video')
      .select('video.id', 'id')
      .addSelect('video.title', 'title')
      .addSelect('video.description', 'description')
      .addSelect('video.accountId', 'accountId')
      .addSelect('video.coverUrl', 'coverUrl')
      .addSelect('video.videoUrl', 'videoUrl')
      .addSelect('video.duration', 'duration')
      .addSelect('video.fileSize', 'fileSize')
      .addSelect('video.tags', 'tags')
      .addSelect('video.status', 'status')
      .addSelect('video.description', 'description')
      .addSelect('video.createdAt', 'createdAt')
      .addSelect('video.updatedAt', 'updatedAt')
      .addSelect('video.playCount', 'playCount')
      .addSelect('video.likeCount', 'likeCount')
      .addSelect('video.favoriteCount', 'favoriteCount')
      .leftJoinAndMapOne(
        'xx',
        (qb) =>
          qb
            .select('account.id', 'accountId')
            .addSelect('account.username', 'accountUsername')
            .from(AccountEntity, 'account'),
        'account',
        'video.accountId=account.accountId'
      );
  }
  get queryCommentBuilder(): SelectQueryBuilder<CommentEntity> {
    return this.commentRepository
      .createQueryBuilder('comment')
      .select('comment.id', 'id')
      .addSelect('comment.content', 'content')
      .addSelect('comment.videoId', 'videoId')
      .addSelect('comment.parentId', 'parentId')
      .addSelect('comment.accountId', 'accountId')
      .addSelect('comment.username', 'username')
      .addSelect('comment.createdAt', 'createdAt');
  }
}
