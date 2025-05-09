"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const constants_1 = require("../../constants");
const video_entity_1 = require("./entities/video.entity");
const comment_entity_1 = require("./entities/comment.entity");
const like_entity_1 = require("./entities/like.entity");
const favorite_entity_1 = require("./entities/favorite.entity");
const play_entity_1 = require("./entities/play.entity");
const video_controller_1 = require("./video.controller");
const video_service_1 = require("./video.service");
const comment_gateway_1 = require("../../event/comment.gateway");
let VideoModule = class VideoModule {
};
exports.VideoModule = VideoModule;
exports.VideoModule = VideoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: constants_1.ADMIN_PREFIX,
                    module: VideoModule,
                },
            ]),
            typeorm_1.TypeOrmModule.forFeature([video_entity_1.VideoEntity, comment_entity_1.CommentEntity, like_entity_1.LikeEntity, favorite_entity_1.FavoriteEntity, play_entity_1.PlayEntity]),
        ],
        controllers: [video_controller_1.VideoController],
        providers: [video_service_1.VideoService, comment_gateway_1.CommentGateway],
    })
], VideoModule);
//# sourceMappingURL=video.module.js.map