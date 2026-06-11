import { KafkaService } from "@app/utils23/kafkaModule23/kafka.service";
import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class Job23Service implements OnApplicationBootstrap {
    private isAppFullyBooted = false;

    constructor(private readonly kafkaService: KafkaService) {
        console.log("⚠️ Job23Service is being instantiated!");
    }
    
    onApplicationBootstrap() {
        this.isAppFullyBooted = true;
        /*
            we have a health-check script or a pre-start script ... the code printing 
            Checking MongoDB connection...  Checking Kafka connection... 
            that is bootstrapping a mini-instance of your NestJS application to verify connections 
            before the actual main.ts file boots the real production application.
            Because that script bootstraps your modules, NestJS kicks off the @Cron() schedule inside the pre-boot instance. Then, main.ts starts up and kicks off a second @Cron() schedule.
            so, prevent @Cron() jobs from running if application isnt fully booted
        */
    }

    @Cron(CronExpression.EVERY_2_HOURS)
    public async job(): Promise<void> {
        if (!this.isAppFullyBooted) {            
            return; 
        }
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