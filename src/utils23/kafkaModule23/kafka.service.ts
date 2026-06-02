import { Injectable, OnApplicationBootstrap, OnModuleInit } from "@nestjs/common";
import { Client, ClientKafka } from "@nestjs/microservices";
import { kafkaConfig } from "./kafka.config";
import { randomUUID } from "crypto";
import { lastValueFrom } from "rxjs";

@Injectable()
export class KafkaService implements OnModuleInit {
    @Client(kafkaConfig)
    clientKafka: ClientKafka;

    async onModuleInit() {
        try {
            await this.clientKafka.connect();
            console.log("Kafka client successfully initialized and connected.");
        } catch (error) {
            console.error("Failed to connect Kafka client:", error);
        }
    }

    public async publish<T>(topic:string, eventKey: string, eventName: string, payload: T): Promise<void> {
        if (!this.clientKafka) {
            console.error("Kafka client is still not initialized!");
            return;
        }
        await lastValueFrom(
                this.clientKafka.emit(topic, {
                key: eventKey,
                value: JSON.stringify(payload),
                headers: {
                    sourceService: 'nest23__emitter',
                    messageId: randomUUID(),
                    eventName
                },
            })
        )
    }
}