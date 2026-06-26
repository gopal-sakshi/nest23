import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { Job24SchedulerProcessor23 } from './job24_processor';
import { Job24SchedulerBabai } from './job24.service';
import { Job24Controller } from './job24.controller';

/*
    how to see in RedisInsight; search for 
    - bull:bullmq-handle-chestunna-redisQueue:*
    - bull:nest23_job24_bullmq_repeatable:*


    bull:nest23_job24_bullmq_repeatable:repeat:nest23_job24_1782482631047
    - its a HASH
    - bull                                      : default global prefix for all BullMQ data.
    - nest23_job24_bullmq_repeatable            : name of your queue
    - repeat                                    : internal BullMQ bucket identifier for repeatable jobs and schedulers.
    - nest23_job24_1782482631047                : final segment is the unique jobId (or scheduler ID) for this specific cron task.
*/


@Module({
    controllers: [ Job24Controller ],
    imports: [
        BullModule.registerQueue({
            name: 'nest23_job24_bullmq_repeatable',
        }),
    ],
    providers: [ Job24SchedulerProcessor23, Job24SchedulerBabai ],
})
export class Job24Module { }
