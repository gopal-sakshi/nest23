import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { WinstonModule } from 'nest-winston';       // publish logs to http port; so logstash can receive them
import * as winston from 'winston';

import { Logging23Interceptor } from './utils23/others23/logging-interceptor';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import * as mongoose from 'mongoose';
import { Kafka } from 'kafkajs';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

async function bootstrap23() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalInterceptors(new Logging23Interceptor());        // using the interceptor globally
    await app.listen(process.env.PORT ?? 5566);
}
bootstarp23_winstonLogger();

async function checkRedisMongoKafka() {

    const appContext = await NestFactory.createApplicationContext(AppModule);
    const configService = appContext.get(ConfigService);
    
    try {
        console.log('Checking MongoDB connection...');              // check mongo
        await mongoose.connect(configService.get<string>('MONGO_URI') || '', { serverSelectionTimeoutMS: 2000 });
        await mongoose.disconnect();

        console.log('Checking Redis connection...');                // check redis
        const redis = new Redis(configService.get<string>('REDIS_URI') || '', { connectTimeout: 2000 });
        await redis.ping();
        redis.disconnect();

        console.log('Checking Kafka connection...');            // 3. Check Kafka
        const kafka = new Kafka({ brokers: [ configService.get<string>('KAFKA_BROKER') || '' ] });
        const admin = kafka.admin();
        await admin.connect();
        await admin.disconnect();

        console.log('All dependencies are online. Starting NestJS...');

        const app = await NestFactory.create(AppModule);
        await app.listen(3000);

    } catch (error) {
        console.error(`Dependency check failed: ${error}`);
        console.error('Gracefully exiting...');
        process.exit(1); // Terminates the process with failure code
    }
}

async function bootstarp23_winstonLogger() {


    await checkRedisMongoKafka();

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