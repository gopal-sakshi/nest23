import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Cats23Controller } from './cats23/cats23.controller';

@Module({
  imports: [],
  controllers: [AppController, Cats23Controller],
  providers: [AppService],
})
export class AppModule {}
