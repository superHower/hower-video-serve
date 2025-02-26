import { ObjectType } from '@src/types';
export declare class LoggerService {
    private logger;
    constructor();
    error(message: string | ObjectType, prefix?: string): void;
    warn(message: string | ObjectType, prefix?: string): void;
    info(message: string | ObjectType, prefix?: string): void;
    http(message: string | ObjectType, prefix?: string): void;
    verbose(message: string | ObjectType, prefix?: string): void;
    debug(message: string | ObjectType, prefix?: string): void;
    silly(message: string | ObjectType, prefix?: string): void;
    private toString;
}
