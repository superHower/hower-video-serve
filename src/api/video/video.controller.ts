import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser, ICurrentUserType } from '@src/decorators';
import { AuthGuard } from '@src/guard/auth.guard';
import { VideoDto, QueryVideoDto, PlayDto } from './dto/video.dto';
import { CreateCommentDto, QueryCommentDto } from './dto/comment.dto';

import { VideoService } from './video.service';
import { VideoPageVo, VideoVo } from './vo/video.vo';
import { CommentPageVo } from './vo/comment.vo';
@UseGuards(AuthGuard)
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}
  // 创建视频
  @Post()
  async createVideoApi(
    @Body() req: VideoDto,
    @CurrentUser('userInfo') currentInfo: ICurrentUserType
  ): Promise<string> {
    return await this.videoService.createVideoApi(req, currentInfo);
  }
  // 评论
  @Post('comment')
  async createCommentApi(
    @Body() req: CreateCommentDto,
    @CurrentUser('userInfo') currentInfo: ICurrentUserType
  ): Promise<string> {
    return this.videoService.createCommentApi(req, currentInfo);
  }
  // 播放（不需要认证）
  @Post('play')
  async playVideoApi(@Body() req: PlayDto): Promise<string> {
    return this.videoService.playVideoApi(req);
  }
  // 点赞
  @Get(':id/like')
  async getLikeApi(
    @Param('id', new ParseIntPipe()) id: number,
    @CurrentUser('userInfo') user: ICurrentUserType
  ): Promise<string> {
    return this.videoService.getLikeApi(id, user.id);
  }

  // 收藏
  @Get(':id/favorite')
  async getFavoriteApi(
    @Param('id', new ParseIntPipe()) id: number,
    @CurrentUser('userInfo') user: ICurrentUserType
  ): Promise<string> {
    return this.videoService.getFavoriteApi(id, user.id);
  }

  // 删除视频
  @Delete(':id')
  async deleteVideoByIdApi(@Param('id', new ParseIntPipe()) id: number): Promise<string> {
    return await this.videoService.deleteVideoByIdApi(id);
  }
  @Post('delete')
  async batchDeleteVideoByIdListApi(@Body() idList: number[]): Promise<string> {
    return await this.videoService.batchDeleteVideoByIdListApi(idList);
  }
  @Delete(':id/comment')
  async deleteCommentByIdApi(
    @Param('id', new ParseIntPipe()) id: number,
    @CurrentUser('userInfo') user: ICurrentUserType
  ): Promise<string> {
    return await this.videoService.deleteCommentByIdApi(id, user.id);
  }
  @Post('comment/delete')
  async batchDeleteCommentByIdListApi(@Body() idList: number[]): Promise<string> {
    return await this.videoService.batchDeleteCommentByIdListApi(idList);
  }

  @Put('/status/:id')
  async modifyVideoStatusByIdApi(@Param('id', new ParseIntPipe()) id: number): Promise<string> {
    return await this.videoService.modifyVideoStatusByIdApi(id);
  }
  // 修改视频
  @Put(':id')
  async modifyVideoByIdApi(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() req: VideoDto
  ): Promise<string> {
    return await this.videoService.modifyVideoByIdApi(id, req);
  }
  @Post('/batchStatus')
  async batchModifyVideoStatusByIdApi(@Body() idList: number[]): Promise<string> {
    return await this.videoService.batchModifyVideoStatusByIdApi(idList);
  }

  // 分页查询视频
  @Post('/list')
  async getVideoPageApi(@Body() queryOption: QueryVideoDto): Promise<VideoPageVo> {
    console.log('controller', queryOption);
    return await this.videoService.getVideoPageApi(queryOption);
  }

  // 根据id获取视频
  @Get(':id')
  async getVideoByIdApi(
    @Param('id', new ParseIntPipe()) id: number,
    @CurrentUser('userInfo') user: ICurrentUserType
  ): Promise<VideoVo | undefined> {
    return await this.videoService.getVideoByIdApi(id, user.id);
  }

  // 获取视频评论列表
  @Post('/comment/list')
  async getCommentsApi(@Body() queryOption: QueryCommentDto): Promise<CommentPageVo> {
    console.log('controller', queryOption);
    return await this.videoService.getCommentsApi(queryOption);
  }
}
