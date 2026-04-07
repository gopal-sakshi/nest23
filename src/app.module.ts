import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Footballer23Module } from './footballer23/footballer.module';
import { Student23Module } from './student23/student23.module';
import { Cats23Module } from './cats23/cats23.module';
import { Movies23Module } from './movie_mongoose/movies-module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017', {
            dbName: 'nestJS_db23',
        }),

        Footballer23Module,
        Student23Module,
        Cats23Module,
        Movies23Module              // uses mongoose, not directly mongodb driver
    ],
    controllers: [
        AppController, 
    ],
    providers: [
        AppService, 
    ],
})
export class AppModule { }
