// footballer.module.ts
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FootballerSchema } from './footballer.schema';
import { FootballerService } from './footballer.service';
import { FootballerController } from './footballer.controller';
import { Footballer23Middleware } from './footballer.middleware';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Footballer23', schema: FootballerSchema }]),
    ],
    controllers: [FootballerController],
    providers: [FootballerService],
})
export class Footballer23Module {
    // configure(consumer: MiddlewareConsumer) {
    //     consumer
    //         .apply(Footballer23Middleware)
    //         // Exclude single path and paths starting with footballer/nonAuth23
    //         .exclude('footballer/sse_endpoint23', '/footballer/nonAuth23/*')
    //         .forRoutes(FootballerController);
    // }
}
