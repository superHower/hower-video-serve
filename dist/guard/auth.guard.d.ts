import { CanActivate, ExecutionContext } from '@nestjs/common';
import { RedisService } from '@src/plugin/redis/redis.service';
export declare class AuthGuard implements CanActivate {
    private readonly redisService;
    constructor(redisService: RedisService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
