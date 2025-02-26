import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { RedisService } from '@src/plugin/redis/redis.service';
export declare class RedisCacheInterceptor implements NestInterceptor {
    private readonly redisService;
    constructor(redisService: RedisService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<any>;
    private redisCacheKey;
}
