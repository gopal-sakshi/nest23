import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Footballer23Module } from './footballer23/footballer.module';
import { Student23Module } from './student23/student23.module';
import { Cats23Module } from './cats23/cats23.module';
import { Movies23Module } from './movie_mongoose/movies-module';
import { KafkaConsumerController } from './kafkaConsumer23/kafka-consumer23.controller';
import { KafkaConsumerModule } from './kafkaConsumer23/kafka-consumer23.module';
import { Cinemalu23Module } from './graphql23/cinemalu23.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env'
        }),
        MongooseModule.forRootAsync({
            inject: [ ConfigService ],
            useFactory: (config:ConfigService) => ({
                uri: config.get<string>('MONGO_URI')
            })
        }),

        Footballer23Module,
        Student23Module,
        Cats23Module,
        Movies23Module,              // uses mongoose, not directly mongodb driver
        KafkaConsumerModule,
        Cinemalu23Module
    ],
    controllers: [
        AppController, 
    ],
    providers: [
        AppService, 
    ],
})
export class AppModule { }
