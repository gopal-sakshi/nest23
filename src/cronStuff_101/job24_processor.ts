import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';

@Injectable()
@Processor('nest23_job24_bullmq_repeatable', {
    concurrency: 10
})
export class Job24SchedulerProcessor23 extends WorkerHost {
    
    async process(job: Job<any, any, string>): Promise<any> {
        console.log(`Worker is processing job ${job.id}...`, job.data);
        // make mongoDB call; fetch data from schedules23 collection
        // CARR23 -- send AWS IoT command, update mongo collection vrf_devices idu config (to reflect current setting)
        // GOPAL --- aws sns service -- send sms to cristiano phone
    }

    @OnWorkerEvent('completed')
    onCompleted23(job: Job) {
        console.log(`completed23 babai____${new Date().toISOString()} ---> `, JSON.stringify(job));
    }

}
