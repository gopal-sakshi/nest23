import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logging23Interceptor } from './utils23/others23/logging-interceptor';

async function bootstrap23() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalInterceptors(new Logging23Interceptor());        // using the interceptor globally
    await app.listen(process.env.PORT ?? 5566);
}
bootstrap23();
