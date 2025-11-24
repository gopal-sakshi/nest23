import { CallHandler, ExecutionContext, NestInterceptor, Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class Student23Interceptors implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // console.log('Before...');
        return next.handle().pipe(
            map(data => {
                // console.log('After... ', data);
                return data.studentData.map((item:any) => ({
                    ...item,
                    interceptor23: `added_by_interceptor23___${new Date().toISOString()}`,
                }))
            }),
        );
    }
}