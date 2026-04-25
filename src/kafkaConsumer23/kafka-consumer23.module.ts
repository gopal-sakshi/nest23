import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BullModule } from '@nestjs/bullmq';
import { KafkaConsumerController } from './kafka-consumer23.controller';
import { RedisQueueDataProcessor23 } from './ProcessQueueData23';

@Module({
    imports: [
        BullModule.forRoot({
            connection: { host: 'localhost', port: 6379, },
        }),

        BullModule.registerQueue({
            name: 'bullmq-handle-chestunna-redisQueue',
        }),
        ClientsModule.register([
            {
                name: 'KAFKA_SERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: { clientId: 'nest-consumer', brokers: ['localhost:9092'], },
                    retry: { initialRetryTime: 100, retries: 8 }, // kafka container close aithe, 8 times try chesi, rest teesuko
                    consumer: { groupId: 'nest-consumer-group', } // Essential for tracking offsets
                },
            },
        ]),
    ],
    providers: [RedisQueueDataProcessor23],
    controllers: [KafkaConsumerController],
})
export class KafkaConsumerModule { }