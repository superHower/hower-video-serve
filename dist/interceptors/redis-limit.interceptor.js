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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisLimitInterceptor = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const redis_service_1 = require("../plugin/redis/redis.service");
const tools_service_1 = require("../plugin/tools/tools.service");
let RedisLimitInterceptor = class RedisLimitInterceptor {
    constructor(redisService, toolsService) {
        this.redisService = redisService;
        this.toolsService = toolsService;
    }
    async intercept(context, next) {
        console.log('限流拦截器');
        const request = context.switchToHttp().getRequest();
        const currentIp = this.toolsService.getReqIP(request);
        const redisKey = `redis_limit_ip_${currentIp}`;
        const isLimitApi = Reflect.getMetadata(constants_1.REDIS_LIMIT_KEY, context.getHandler()) ||
            Reflect.getMetadata(constants_1.REDIS_LIMIT_KEY, context.getClass());
        const redisRangeSecond = Reflect.getMetadata(constants_1.REDIS_LIMIT_RANGE_SECOND_KEY, context.getHandler()) ||
            Reflect.getMetadata(constants_1.REDIS_LIMIT_RANGE_SECOND_KEY, context.getClass());
        const redisMaxRequest = Reflect.getMetadata(constants_1.REDIS_LIMIT_MAX_REQUEST_KEY, context.getHandler()) ||
            Reflect.getMetadata(constants_1.REDIS_LIMIT_MAX_REQUEST_KEY, context.getClass());
        if (isLimitApi) {
            console.log('走限流操作');
            const currentCount = await this.redisService.get(redisKey);
            if (currentCount) {
                if (currentCount >= redisMaxRequest) {
                    throw new common_1.HttpException('访问过于频繁', common_1.HttpStatus.TOO_MANY_REQUESTS);
                }
                await this.redisService.incr(redisKey);
                return next.handle();
            }
            else {
                await this.redisService.set(redisKey, 1, redisRangeSecond);
                return next.handle();
            }
        }
        else {
            return next.handle();
        }
    }
};
exports.RedisLimitInterceptor = RedisLimitInterceptor;
exports.RedisLimitInterceptor = RedisLimitInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService,
        tools_service_1.ToolsService])
], RedisLimitInterceptor);
//# sourceMappingURL=redis-limit.interceptor.js.map