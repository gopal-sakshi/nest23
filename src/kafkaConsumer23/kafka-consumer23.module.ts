import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BullModule } from '@nestjs/bullmq';
import { KafkaConsumerController } from './kafka-consumer23.controller';
import { RedisQueueDataProcessor23 } from './ProcessQueueData23';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        BullModule.forRoot({
            connection: { host: 'localhost', port: 6379, },
        }),
        BullModule.registerQueue({
            name: 'bullmq-handle-chestunna-redisQueue',
        }),
    ],
    providers: [RedisQueueDataProcessor23],
    controllers: [KafkaConsumerController],    
})
export class KafkaConsumerModule { }