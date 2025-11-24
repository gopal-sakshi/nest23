import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class Logging23Interceptor implements NestInterceptor {
    
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        console.log('Before route handler...'); // Runs before the handler
        return next.handle().pipe(
            tap(() => console.log(`After route handler... Request took ${Date.now() - now}ms`)), // Runs after the handler returns
        );
    }
}
