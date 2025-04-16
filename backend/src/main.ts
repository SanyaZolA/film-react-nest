import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //все эндпоинты начинаются с api/afisha
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  await app.listen(config.port);
}
bootstrap();
