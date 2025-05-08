import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { config } from './config';
import { DevLogger } from './logger/dev.logger';
import { JsonLogger } from './logger/json.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true, // Буферим логи до инициализации логгера
  });
  // app.useLogger(new DevLogger());
  app.useLogger(new DevLogger());
  //все эндпоинты начинаются с api/afisha
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  await app.listen(config.port);
}
bootstrap();
