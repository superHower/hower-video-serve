"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../../utils");
const enums_1 = require("../../enums");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const video_entity_1 = require("./entities/video.entity");
const comment_entity_1 = require("./entities/comment.entity");
const like_entity_1 = require("./entities/like.entity");
const play_entity_1 = require("./entities/play.entity");
const favorite_entity_1 = require("./entities/favorite.entity");
const account_entity_1 = require("../account/entities/account.entity");
let VideoService = class VideoService {
    constructor(videoRepository, commentRepository, likeRepository, playRepository, favoriteRepository) {
        this.videoRepository = videoRepository;
        this.commentRepository = commentRepository;
        this.likeRepository = likeRepository;
        this.playRepository = playRepository;
        this.favoriteRepository = favoriteRepository;
    }
    async createVideoApi(req, currentInfo) {
        const { id } = currentInfo;
        console.log('当前用户ID', id);
        const videoEntity = await this.videoRepository.findOne({
            where: { title: req.title, accountId: id },
            select: ['id'],
        });
        if (videoEntity)
            throw new common_1.HttpException(`视频[${req.title}]已存在`, common_1.HttpStatus.OK);
        const videoData = this.videoRepository.create(Object.assign(Object.assign({}, req), { accountId: id, status: enums_1.StatusEnum.PENDING }));
        await this.videoRepository.save(videoData);
        return '视频创建成功';
    }
    async createCommentApi(req, currentInfo) {
        const { id, username } = currentInfo;
        const commentData = this.commentRepository.create(Object.assign(Object.assign({}, req), { accountId: id, username: username }));
        await this.commentRepository.save(commentData);
        return '评论创建成功';
    }
    async playVideoApi(req) {
        const playData = this.playRepository.create(req);
        await this.playRepository.save(playData);
        return '播放成功';
    }
    async getLikeApi(vid, uid) {
        const likeData = await this.likeRepository.findOne({
            where: { videoId: vid, accountId: uid },
        });
        if (likeData) {
            await this.likeRepository.delete(likeData.id);
            return '取消点赞';
        }
        else {
            const likeData = this.likeRepository.create({ videoId: vid, accountId: uid });
            await this.likeRepository.save(likeData);
            return '点赞成功';
        }
    }
    async getFavoriteApi(vid, uid) {
        const favoriteData = await this.favoriteRepository.findOne({
            where: { videoId: vid, accountId: uid },
        });
        if (favoriteData) {
            await this.favoriteRepository.delete(favoriteData.id);
            return '取消收藏';
        }
        else {
            const favoriteData = this.favoriteRepository.create({ videoId: vid, accountId: uid });
            await this.favoriteRepository.save(favoriteData);
            return '收藏成功';
        }
    }
    async deleteVideoByIdApi(id) {
        const { affected } = await this.videoRepository.softDelete(id);
        return affected ? '删除成功' : '删除失败';
    }
    async batchDeleteVideoByIdListApi(idList) {
        const { affected } = await this.videoRepository.softDelete({ id: (0, typeorm_2.In)(idList) });
        return affected ? `成功删除${affected}条数据` : '删除失败';
    }
    async batchDeleteCommentByIdListApi(idList) {
        const { affected } = await this.commentRepository.softDelete({ id: (0, typeorm_2.In)(idList) });
        return affected ? `成功删除${affected}条数据` : '删除失败';
    }
    async deleteCommentByIdApi(vid, uid) {
        const commentEntity = await this.commentRepository.findOne({
            where: { accountId: uid, videoId: vid },
            select: ['id'],
        });
        const { affected } = await this.commentRepository.softDelete(commentEntity.id);
        return affected ? '删除成功' : '删除失败';
    }
    async modifyVideoStatusByIdApi(id) {
        const videoEntity = await this.videoRepository.findOne({
            where: { id },
            select: ['status'],
        });
        if (!videoEntity) {
            throw new common_1.HttpException('视频不存在', common_1.HttpStatus.OK);
        }
        const newStatus = videoEntity.status === enums_1.StatusEnum.NORMAL ? enums_1.StatusEnum.FORBIDDEN : enums_1.StatusEnum.NORMAL;
        const { affected } = await this.videoRepository.update(id, { status: newStatus });
        return affected ? '状态修改成功' : '状态修改失败';
    }
    async modifyVideoByIdApi(id, req) {
        const existVideo = await this.videoRepository.findOne({
            where: { title: req.title },
            select: ['id'],
        });
        if (existVideo && existVideo.id !== id) {
            throw new common_1.HttpException(`标题[${req.title}]已存在`, common_1.HttpStatus.OK);
        }
        const { affected } = await this.videoRepository.update(id, req);
        return affected ? '更新成功' : '更新失败';
    }
    async batchModifyVideoStatusByIdApi(idList) {
        const videos = await this.videoRepository.find({
            where: { id: (0, typeorm_2.In)(idList) },
            select: ['id', 'status'],
        });
        const statusList = videos.map((item) => item.status);
        if ([...new Set(statusList)].length > 1) {
            throw new common_1.HttpException('当前传递的数据状态不统一,不能批量操作', common_1.HttpStatus.OK);
        }
        const { affected } = await this.videoRepository.update(idList, {
            status: statusList[0] == enums_1.StatusEnum.NORMAL ? enums_1.StatusEnum.FORBIDDEN : enums_1.StatusEnum.NORMAL,
        });
        return affected ? '修改成功' : '修改失败';
    }
    async getVideoByIdApi(id) {
        const video = await this.queryVideoBuilder.where('video.id  = :id', { id }).getRawOne();
        const playCount = await this.playRepository.count({ where: { videoId: id } });
        return Object.assign(Object.assign({}, video), { playCount });
    }
    async getVideoPageApi(queryOption) {
        const { title, status, accountId, tags, pageNumber = enums_1.PageEnum.PAGE_NUMBER, pageSize = enums_1.PageEnum.PAGE_SIZE, } = queryOption;
        console.log('输出', queryOption);
        const query = new Map();
        if (title) {
            query.set('title', (0, typeorm_2.ILike)(`%${title}%`));
        }
        if (accountId) {
            query.set('accountId', (0, typeorm_2.Equal)(accountId + ''));
        }
        if (status >= 0) {
            query.set('status', (0, typeorm_2.Equal)(status + ''));
        }
        if (tags >= 0) {
            query.set('tags', (0, typeorm_2.Equal)(tags + ''));
        }
        query.set('deletedAt', (0, typeorm_2.IsNull)());
        const queryBuilder = this.queryVideoBuilder;
        const data = await queryBuilder
            .where((0, utils_1.mapToObj)(query))
            .orderBy({ id: 'DESC' })
            .offset((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .printSql()
            .getRawMany();
        const total = await this.videoRepository
            .createQueryBuilder('video')
            .where((0, utils_1.mapToObj)(query))
            .getCount();
        return {
            data,
            total,
            pageNumber,
            pageSize,
        };
    }
    async getCommentsApi(queryOption) {
        const { videoId, pageNumber = enums_1.PageEnum.PAGE_NUMBER, pageSize = enums_1.PageEnum.PAGE_SIZE, } = queryOption;
        const query = new Map();
        if (videoId) {
            query.set('videoId', (0, typeorm_2.Equal)(videoId + ''));
            query.set('deletedAt', (0, typeorm_2.IsNull)());
        }
        const queryBuilder = this.queryCommentBuilder;
        const data = await queryBuilder
            .where((0, utils_1.mapToObj)(query))
            .orderBy({ id: 'DESC' })
            .offset((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .printSql()
            .getRawMany();
        const total = await this.commentRepository
            .createQueryBuilder('comment')
            .where((0, utils_1.mapToObj)(query))
            .getCount();
        return {
            data,
            total,
            pageNumber,
            pageSize,
        };
    }
    get queryVideoBuilder() {
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
            .leftJoinAndMapOne('xx', (qb) => qb
            .select('account.id', 'accountId')
            .addSelect('account.username', 'accountUsername')
            .from(account_entity_1.AccountEntity, 'account'), 'account', 'video.accountId=account.accountId');
    }
    get queryCommentBuilder() {
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
};
exports.VideoService = VideoService;
exports.VideoService = VideoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(video_entity_1.VideoEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(comment_entity_1.CommentEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(like_entity_1.LikeEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(play_entity_1.PlayEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(favorite_entity_1.FavoriteEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], VideoService);
//# sourceMappingURL=video.service.js.map