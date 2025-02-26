import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { RedisService } from '@src/plugin/redis/redis.service';
import { ToolsService } from '@src/plugin/tools/tools.service';
export declare class RedisLimitInterceptor implements NestInterceptor {
    private readonly redisService;
    private readonly toolsService;
    constructor(redisService: RedisService, toolsService: ToolsService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<any>;
}
