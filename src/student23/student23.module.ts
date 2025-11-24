// student23.module.ts
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from './student.schema';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student23Middleware } from './student.middleware';
import { Student23Interceptors } from './student-custom-interceptor';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
    ],
    controllers: [ StudentController ],
    providers: [StudentService, Student23Interceptors],
})
export class Student23Module {
    configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(Student23Middleware)
        .forRoutes(
            { path: 'student', method: RequestMethod.POST },
        );
    }
}


