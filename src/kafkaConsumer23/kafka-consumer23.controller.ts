import { InjectQueue } from '@nestjs/bullmq';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, KafkaContext } from '@nestjs/microservices';
import { Queue } from 'bullmq';
import { WebsocketGateway23 } from './websocket_gateway23';
/*
    queue anedi redis server lo ne untundi. BullMQ redis keys (hashes, lists, sets) to queue manage chestundi
    BullMQ uses Redis Hashes for job data; Sorted Sets/Lists for queue management (waiting, active, delayed)
*/
@Controller()
export class KafkaConsumerController {

    constructor(
        @InjectQueue('bullmq-handle-chestunna-redisQueue') private readonly redisQueue23: Queue,
        private readonly wsGateway23: WebsocketGateway23 // <-- Inject Gateway here
    ) { }

    @MessagePattern('containers33-topic_a1') // Matches the topic name from your Node script
    async handleMessage(@Payload() message: any, @Ctx() context: KafkaContext) {
        const originalMessage = context.getMessage();
        const partition = context.getPartition();
        const offset = originalMessage.offset;

        // STEP 1       == timescale DB lo data pettu
        console.log(`--- New Message Received ---`);
        console.log(`Payload:`, message);
        console.log(`Partition: ${partition} | Offset: ${offset}`);


        // STEP 2       == bullmq queue lo pettu...  acting as BullMQ Producer
        await this.redisQueue23.add('upload-job24', {
            data: message,
            receivedAt: new Date().toISOString(),
            kafkaOffset: offset
        });
        console.log('--- Added to BullMQ (Redis) ---');


        // STEP 3: Send via WebSocket to Frontend instantly!
        this.wsGateway23.sendKafkaUpdate({
            topic: 'containers33-topic_a1',
            partition,
            offset,
            data: message
        });
        console.log('--- Broadcasted to WebSockets 23 ---');
    }
}