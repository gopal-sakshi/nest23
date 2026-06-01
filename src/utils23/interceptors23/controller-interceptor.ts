import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError, } from 'rxjs/operators';
import { trace } from '@opentelemetry/api';

@Injectable()
export class ControllerInterceptor23 implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        const span = trace.getActiveSpan() as any;
        return next.handle().pipe(
            tap((res) => {
                if(span) { 
                    span.setAttribute('response', JSON.stringify(res)) 
                };
            }),
            catchError((err) => {
                if(span) {
                    span.recordException(err),
                    span.setStatus({ code: 2, message: err.message });
                }
                throw err;
            })
        )
    }
}