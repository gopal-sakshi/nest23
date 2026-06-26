import { InjectQueue } from '@nestjs/bullmq';
import { OnModuleInit } from '@nestjs/common';
import { Queue, RepeatOptions } from 'bullmq';
import { Cristiano23Schedule } from './job24_mongo_schedule';


export class Job24SchedulerBabai implements OnModuleInit {
    
    constructor(@InjectQueue(`nest23_job24_bullmq_repeatable`) private scheduleQueue23: Queue<any>) { }

    onModuleInit() { }
    
    async createSchedule() {
        // create 23 schedules in mongo collection; --- YET TO DO --- LATER
        // 01) wake cristiano at 5am everyday phone SMS     02) set WAKE profile to my AC IDU unit
        // 03) turn off TV, HEATER at 10pm night day everyday -- so, send AWS IoT command

        // assume mongo document is inserted & assume this is a sample schedule

        await this.createBullMQJobs(Cristiano23Schedule);
    }

    async createBullMQJobs(schedule:any) {
        if(!schedule.is_active) { console.log('schedule create chesaaru kaani, present active ledu; so bullmq jobs vaddu'); return; }
        await this.setupCronJob();
    }

    async setupCronJob() {
        const jobId = `nest23_job24_${Date.now()}`;
        const repeatOptions23:RepeatOptions = {
            pattern: '*/5 * * * *',
            endDate: `2026-06-27T00:00:00.000Z`
        };
        const payload23 = {
                name: `NAME23__${jobId}`,
                data: { info23: `bullmq repeatable jobs, schedules23`, format: 'pdf' },
                opts: { removeOnComplete: false, removeOnFail: false, attempts:5, backoff: { type: 'exponential', delay: 30_000, }  }
            }
        await this.scheduleQueue23.upsertJobScheduler(jobId, repeatOptions23, payload23);

        console.log('Cron job scheduler registered.');
    }

    async updateSchedule(jobId:string, repeatOptions24:RepeatOptions, payload24:any) {
        await this.scheduleQueue23.upsertJobScheduler(jobId, repeatOptions24, payload24 );
    }

    async removeScheduleJob() {
        // yet to be implemented
    }

    async getScheduleQueueMetrics():Promise<any> {
        return this.scheduleQueue23.getMetrics('completed');
    }
}
