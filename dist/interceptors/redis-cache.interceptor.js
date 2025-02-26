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
exports.RedisCacheInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const redis_service_1 = require("../plugin/redis/redis.service");
const constants_1 = require("../constants");
let RedisCacheInterceptor = class RedisCacheInterceptor {
    constructor(redisService) {
        this.redisService = redisService;
    }
    async intercept(context, next) {
        console.log('缓存拦截器');
        const request = context.switchToHttp().getRequest();
        const isCacheApi = Reflect.getMetadata(constants_1.REDIS_CACHE_KEY, context.getHandler()) ||
            Reflect.getMetadata(constants_1.REDIS_CACHE_KEY, context.getClass());
        const redisEXSecond = Reflect.getMetadata(constants_1.REDIS_CACHE_EX_SECOND_KEY, context.getHandler()) ||
            Reflect.getMetadata(constants_1.REDIS_CACHE_EX_SECOND_KEY, context.getClass());
        const isDiffUser = Reflect.getMetadata(constants_1.REDIS_CACHE_EX_DIFF_USER_KEY, context.getHandler()) ||
            Reflect.getMetadata(constants_1.REDIS_CACHE_EX_DIFF_USER_KEY, context.getClass());
        if (isCacheApi) {
            console.log('走缓存');
            let redisKey = this.redisCacheKey(request.method, request.url);
            if (request.user && isDiffUser) {
                redisKey = this.redisCacheKey(request.method, request.url, `${request.user.username}_${request.user.id}`);
            }
            const redisData = await this.redisService.get(redisKey);
            if (redisData) {
                console.log('redis直接返回');
                return (0, rxjs_1.of)(redisData);
            }
            else {
                console.log('走后端');
                return next.handle().pipe((0, operators_1.map)((data) => {
                    this.redisService.set(redisKey, data, redisEXSecond);
                    return data;
                }));
            }
        }
        else {
            console.log('不走缓存');
            return next.handle();
        }
    }
    redisCacheKey(method, url, identity) {
        if (identity) {
            return `${identity}_${method}:${url}`;
        }
        else {
            return `${method}:${url}`;
        }
    }
};
exports.RedisCacheInterceptor = RedisCacheInterceptor;
exports.RedisCacheInterceptor = RedisCacheInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], RedisCacheInterceptor);
//# sourceMappingURL=redis-cache.interceptor.js.map