import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class Logging23Interceptor implements NestInterceptor {
    private readonly logger = new Logger('HTTP');
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        // console.log('Before route handler...'); // Runs before the handler
        const request = context.switchToHttp().getRequest();
        const { method, url } = request;
        return next.handle().pipe(
            tap(() => this.logger.log(`${method} ${url} - Success; Request took ${Date.now() - now}ms`))
        );
    }
}
