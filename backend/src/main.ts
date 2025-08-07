import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { config } from './config';
import { DevLogger } from './logger/dev.logger';
import { JsonLogger } from './logger/json.logger';
import { TSKVLogger } from './logger/tskv.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true, // Буферим логи до инициализации логгера
  });
  const loggerType = process.env.LOGGER_TYPE || 'dev';
  const logger =
    loggerType === 'json'
      ? new JsonLogger()
      : loggerType === 'tskv'
        ? new TSKVLogger()
        : new DevLogger();

  app.useLogger(logger);
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  await app.listen(config.port);
}
bootstrap();
