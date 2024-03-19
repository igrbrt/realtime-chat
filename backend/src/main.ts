import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('Bootstrap Application');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [process.env.FRONTEND_URL],
  });

  await app.listen(3001, '0.0.0.0');

  logger.log(`🚀 Server is running on: ${await app.getUrl()}`);
}
bootstrap();
