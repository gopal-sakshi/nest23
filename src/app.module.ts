import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
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
import { MetricsModule } from './z_metrics/metrics.module';
import { MetricsMiddleware } from './utils23/others24/metrics-middleware23';
import { Job23Module } from './cronStuff_101/job23/job23.module';
import { ScheduleModule } from '@nestjs/schedule';
import { KafkaModule } from './utils23/kafkaModule23/kafka.module';

@Module({
    imports: [
        KafkaModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env'
        }),
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                uri: config.get<string>('MONGO_URI')
            })
        }),

        Footballer23Module,
        Student23Module,
        Cats23Module,
        Movies23Module,              // uses mongoose, not directly mongodb driver
        KafkaConsumerModule,
        Cinemalu23Module,
        Job23Module,
        ScheduleModule.forRoot(),
        MetricsModule
    ],
    controllers: [
        AppController,
    ],
    providers: [
        AppService,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(MetricsMiddleware)
            .exclude({ path: 'metrics', method: RequestMethod.GET })
            .forRoutes('*');
    }
}


// export class AppModule { }      // use this simple one if you dont want prom metrics