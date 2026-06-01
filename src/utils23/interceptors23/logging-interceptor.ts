import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class Logging23Interceptor implements NestInterceptor {
    private readonly logger = new Logger('HTTP');
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        
        let request = context.switchToHttp().getRequest();

        if(!request) {
            const gqlContext = GqlExecutionContext.create(context);
            request = gqlContext.getContext().req;
        }
        const now = Date.now();
        const { method, url } = request;
        return next.handle().pipe(
            tap(() => this.logger.log(`${method} ${url} - Success; Request took ${Date.now() - now}ms`))
        );
    }
}
