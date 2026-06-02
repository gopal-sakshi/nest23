import { KafkaService } from "@app/utils23/kafkaModule23/kafka.service";
import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class Job23Service {
    constructor(
        private readonly kafkaService: KafkaService
    ) {}

    @Cron(CronExpression.EVERY_10_SECONDS)
    public async job(): Promise<void> {
        console.log("running job ----> ", new Date().toISOString());
        const payload23 = {
            time23: new Date().toISOString(),
            favPlayer23: 'CR7'
        }
        const resp = await this.kafkaService.publish('nest23_cron_job23_topic23', 'eventKey23', 'eventName23', payload23);
        console.log("published to topic ===> ", resp);
    }
}

/*
    other cron patterns
    @Cron('0 7 * * 0')
    @Cron('0 3 * * *')

*/