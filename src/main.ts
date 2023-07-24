import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { logger } from './shared/middlewares/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);
  await app.listen(process.env.API_PORT);
}

bootstrap()
  .then(() => {
    Logger.log(`API Listen on http://localhost:${process.env.API_PORT}`);
  })
  .catch((error) => Logger.error(error));
