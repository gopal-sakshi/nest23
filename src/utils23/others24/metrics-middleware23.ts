/*
    Using a NestMiddleware instead of an interceptor is an excellent approach for tracking HTTP traffic. 
    Middleware executes at the very entry point of the HTTP layer—before NestJS guards, interceptors, or route handlers are processed. 
    This means it accurately catches all incoming traffic, including requests that might fail early or get blocked by route authentication guards.
*/

import { MetricsService } from '@app/z_metrics/metrics.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
    constructor(private readonly metricsService: MetricsService) { }

    use(req: Request, res: Response, next: NextFunction) {
        // console.log(`[MetricsMiddleware] Intercepted: ${req.method} ${req.url}`);
        const { method, baseUrl, route } = req;
        const path = route?.path || baseUrl || req.url;

        const startTime = process.hrtime();

        res.on('finish', () => {
            // console.log("ended23 ========== ");
            const { statusCode } = res;
            const diff = process.hrtime(startTime);
            const durationInSeconds = diff[0] + diff[1] / 1e9;

            this.metricsService.httpTotalCount.inc({
                method,
                route: path,
                status: statusCode.toString(),
            });

            this.metricsService.httpTotalDuration.set(
                { method, route: path },
                durationInSeconds
            );
        });

        next();
    }
}