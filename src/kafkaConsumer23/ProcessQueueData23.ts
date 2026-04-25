import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('bullmq-handle-chestunna-redisQueue')
export class RedisQueueDataProcessor23 extends WorkerHost {
    
    async process(job: Job<any, any, string>): Promise<any> {
        console.log(`Worker is processing job ${job.id}...`, job.data);

        // Simulate slow S3 upload for now... repu poddunna, AWS creds ichi, S3 lo upload chesuko
        await new Promise(resolve => setTimeout(resolve, 2000));

        return { status: 'success' };
    }

}
