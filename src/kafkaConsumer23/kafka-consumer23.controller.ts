import { InjectQueue } from '@nestjs/bullmq';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, KafkaContext } from '@nestjs/microservices';
import { Queue } from 'bullmq';
/*
    queue anedi redis server lo ne untundi. BullMQ redis keys (hashes, lists, sets) to queue manage chestundi
    BullMQ uses Redis Hashes for job data; Sorted Sets/Lists for queue management (waiting, active, delayed)
*/
@Controller()
export class KafkaConsumerController {

    constructor(
        @InjectQueue('bullmq-handle-chestunna-redisQueue') private readonly redisQueue23: Queue
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

    }
}