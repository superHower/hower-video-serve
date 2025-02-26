import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { LoggerService } from '@src/plugin/logger/logger.service';
import { Observable } from 'rxjs';
export declare class LoggerInterceptor implements NestInterceptor {
    private readonly logger;
    constructor(logger: LoggerService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
