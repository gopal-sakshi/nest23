import { Module, Global } from "@nestjs/common";
import { KafkaService } from "./kafka.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";

@Global()
@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'KAFKA_SERVICE',
                inject: [ConfigService],
                useFactory: () => ({
                    transport: Transport.KAFKA,
                    options: {
                        client: { clientId: 'nest-consumer', brokers: ['localhost:9092'], },
                        retry: { initialRetryTime: 100, retries: 8 }, // kafka container close aithe, 8 times try chesi, rest teesuko
                        consumer: { groupId: 'nest-consumer-group', } // Essential for tracking offsets
                    },
                }),
            },
        ]),
    ],
    providers: [KafkaService],
    exports: [KafkaService, ClientsModule]
})
export class KafkaModule { }