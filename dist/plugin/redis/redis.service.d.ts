import Redis, { ClientContext, Result } from 'ioredis';
import { ObjectType } from '@src/types';
export declare class RedisService {
    redisClient: Redis;
    onModuleInit(): void;
    private getClient;
    set(key: string, value: unknown): Promise<Result<'OK', ClientContext>>;
    set(key: string, value: unknown, second: number): Promise<Result<'OK', ClientContext>>;
    incr(key: string): Promise<Result<number, ClientContext>>;
    get(key: string): Promise<Result<string | null, ClientContext>>;
    del(key: string): Promise<Result<number, ClientContext>>;
    hset(key: string, field: ObjectType): Promise<Result<number, ClientContext>>;
    hget(key: string, field: string): Promise<Result<string | null, ClientContext>>;
    hgetall(key: string): Promise<Result<Record<string, string>, ClientContext>>;
    flushall(): Promise<Result<'OK', ClientContext>>;
}
