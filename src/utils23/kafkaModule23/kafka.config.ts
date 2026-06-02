import { KafkaOptions, Transport } from "@nestjs/microservices";
import { KafkaConfig, logLevel } from "kafkajs";
import { ConsumerConfig } from '@nestjs/microservices/external/kafka.interface';

const brokers = ['localhost:9092'];
const clientId = 'nest-consumer';

const clientConfig: KafkaConfig = {
    clientId, 
    brokers,
    logLevel: logLevel['INFO'],
    retry: {
        retries: 3,
    }
}

const consumerConfig: ConsumerConfig = {
    groupId: 'edo-oka-groupId',
    allowAutoTopicCreation: true,
    sessionTimeout: 90000,
    heartbeatInterval: 30000,
}

export const kafkaConfig:KafkaOptions = {
    transport: Transport.KAFKA,
    options: {
        client: clientConfig,
        consumer: consumerConfig,
        producer: {
            allowAutoTopicCreation: true
        }
    }
}