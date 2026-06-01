import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { Module } from '@nestjs/common';

@Module({
    controllers: [MetricsController],
    providers: [MetricsService],
    exports: [MetricsService], // Export so services/interceptors can use it
})
export class MetricsModule { }