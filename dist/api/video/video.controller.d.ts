import { ICurrentUserType } from '@src/decorators';
import { VideoDto, QueryVideoDto, PlayDto } from './dto/video.dto';
import { CreateCommentDto, QueryCommentDto } from './dto/comment.dto';
import { VideoService } from './video.service';
import { VideoPageVo, VideoVo } from './vo/video.vo';
import { CommentPageVo } from './vo/comment.vo';
export declare class VideoController {
    private readonly videoService;
    constructor(videoService: VideoService);
    createVideoApi(req: VideoDto, currentInfo: ICurrentUserType): Promise<string>;
    createCommentApi(req: CreateCommentDto, currentInfo: ICurrentUserType): Promise<string>;
    playVideoApi(req: PlayDto): Promise<string>;
    getLikeApi(id: number, user: ICurrentUserType): Promise<string>;
    getFavoriteApi(id: number, user: ICurrentUserType): Promise<string>;
    deleteVideoByIdApi(id: number): Promise<string>;
    batchDeleteVideoByIdListApi(idList: number[]): Promise<string>;
    deleteCommentByIdApi(id: number, user: ICurrentUserType): Promise<string>;
    batchDeleteCommentByIdListApi(idList: number[]): Promise<string>;
    modifyVideoStatusByIdApi(id: number): Promise<string>;
    modifyVideoByIdApi(id: number, req: VideoDto): Promise<string>;
    batchModifyVideoStatusByIdApi(idList: number[]): Promise<string>;
    getVideoPageApi(queryOption: QueryVideoDto): Promise<VideoPageVo>;
    getVideoByIdApi(id: number): Promise<VideoVo | undefined>;
    getCommentsApi(queryOption: QueryCommentDto): Promise<CommentPageVo>;
}
