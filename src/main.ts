import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { WinstonModule } from 'nest-winston';       // publish logs to http port; so logstash can receive them
import * as winston from 'winston';

import { Logging23Interceptor } from './utils23/others23/logging-interceptor';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap23() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalInterceptors(new Logging23Interceptor());        // using the interceptor globally
    await app.listen(process.env.PORT ?? 5566);
}
bootstarp23_winstonLogger();

async function bootstarp23_winstonLogger() {
    const app = await NestFactory.create(AppModule, {
        logger: WinstonModule.createLogger({
            transports: [                
                new winston.transports.Console({                    // 1. Output to Console (stdout)
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.colorize(),
                        winston.format.printf(({ timestamp, level, message, context }) => {
                            return `[nest23] ${timestamp} ${level}: [${context || 'App'}] ${message}`;
                        }),
                    ),
                }),
                new winston.transports.Http({               // 2. Output to Logstash (HTTP)
                    host: 'localhost', // or the IP of your Logstash container
                    port: 50001,        // ensure this matches your logstash.conf
                    path: '/',
                    format: winston.format.json(), // Logstash prefers JSON via HTTP
                }),
            ],
        }),
    });

    // --- Kafka Microservice Configuration ---
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.KAFKA,
        options: {
            client: {
                brokers: ['localhost:9092'],
            },
            consumer: {
                groupId: 'nest23-consumer-group',
            },
        },
    });

    // This starts the Kafka listeners in the background
    await app.startAllMicroservices();

    app.useGlobalInterceptors(new Logging23Interceptor());
    await app.listen(process.env.PORT ?? 5566);
}