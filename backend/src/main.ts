import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //все эндпоинты начинаются с api/afisha
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
