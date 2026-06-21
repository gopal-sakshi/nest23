import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

/*
    @Processor('bullmq-handle-chestunna-redisQueue', { concurrency: 10 }) 
    - No, concurrency does not start a new NestJS process or open a new port.
    - Your NestJS app remains a single process with a single PID (Process ID). It listens on its original port (e.g., 3000)
    - Your "single" NestJS instance pulls 10 jobs simultaneously from Redis.
    - It starts executing all 10 jobs at the same time inside the same event loop.
    - When Job 1 pauses to wait for a database or API response, Node.js instantly switches to work on Job 2, Job 3, and so on
    - 

*/
@Processor('bullmq-handle-chestunna-redisQueue')
export class RedisQueueDataProcessor23 extends WorkerHost {
    
    async process(job: Job<any, any, string>): Promise<any> {
        console.log(`Worker is processing job ${job.id}...`, job.data);

        // Simulate slow S3 upload for now... repu poddunna, AWS creds ichi, S3 lo upload chesuko
        await new Promise(resolve => setTimeout(resolve, 2000));

        return { status: 'success' };
    }

    @OnWorkerEvent('completed')
    onCompleted23(job: Job) {
        console.log("completed23 babai --- ");
    }

}
