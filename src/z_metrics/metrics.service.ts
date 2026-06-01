import { Injectable } from '@nestjs/common';
import { collectDefaultMetrics, register, Counter, Gauge } from 'prom-client';

@Injectable()
export class MetricsService {
    public httpTotalCount: Counter<string>;
    public httpTotalDuration: Gauge<string>;

    constructor() {
        // 1. CLEAR THE GLOBAL REGISTRY ON BOOT/RELOAD; This stops the "already been registered" error forever by wiping previous hot-reload memory
        register.clear();
        collectDefaultMetrics({ prefix: 'nestjs23__prom22__' });

        this.httpTotalCount = new Counter({
            name: 'nodejs_http_total_count23_babai',
            help: 'Total number of HTTP requests processed',
            labelNames: ['method', 'route', 'status']
        });

        this.httpTotalDuration = new Gauge({
            name: 'nodejs_http_total_duration23_tammudu',
            help: 'Duration of HTTP requests in seconds',
            labelNames: ['method', 'route']
        });
    }

    // Exposes the raw string payload that Prometheus needs to scrape
    public async getMetrics(): Promise<string> {
        return register.metrics();
    }
}