import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class ApiInterceptor implements NestInterceptor {
    private readonly whiteUrlList;
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
