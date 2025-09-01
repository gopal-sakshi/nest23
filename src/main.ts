import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap23() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 5566);
}
bootstrap23();
