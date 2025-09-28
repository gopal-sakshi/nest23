import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FootballerSchema } from './z_schema/footballer.schema';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Cats23Controller } from './cats23/cats23.controller';
import { FootballerService } from './z_footballer/footballer.service';
import { FootballerController } from './z_footballer/footballer.controller';
import { StudentSchema } from './z_schema/student.schema';
import { StudentController } from './z_student/student.controller';
import { StudentService } from './z_student/student.service';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017', {
            dbName: 'nestJS_db23',
        }),
        MongooseModule.forFeature([{ name: 'Footballer23', schema: FootballerSchema }]),
        MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
    ],
    controllers: [
        AppController, Cats23Controller, 
        StudentController, 
        FootballerController 
    ],
    providers: [
        AppService, 
        StudentService, 
        FootballerService 
    ],
})
export class AppModule { }
