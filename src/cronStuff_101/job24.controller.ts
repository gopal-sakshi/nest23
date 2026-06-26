import { Body, Controller, Post, Put, Res } from '@nestjs/common';
import { Job24SchedulerBabai } from './job24.service';
import { RepeatOptions } from 'bullmq';


@Controller('job24')
export class Job24Controller {

    constructor(private readonly job24Service: Job24SchedulerBabai) { }

    @Post('create_schedule')
    async createScheduleAndBullMqJobs(@Res() response): Promise<any> {
        await this.job24Service.createSchedule();
        return response.status(200).send({ info23: new Date().toISOString(), info24: `schedule create ayindo ledo choosko` });
    }

    @Put('update_schedule')
    async updateScheduleAndBullMqJobs(
        @Res() response,
        @Body() inputPayload44: { jobId:string, repeatOptions24:RepeatOptions, payload24:any },
    ): Promise<any> {
        if(!inputPayload44.jobId) { return response.status(400).send({ info23: `wrong jobId babai` }) }
        await this.job24Service.updateSchedule(inputPayload44.jobId, inputPayload44.repeatOptions24, inputPayload44.payload24);
        return response.status(200).send({ info23: new Date().toISOString(), info24: `schedule update ayindo ledo choosko` });
    }
}
