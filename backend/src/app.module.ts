import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';
import { configProvider } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { FilmsService } from './films/films.service';
import { FilmsRepository } from './repository/films.repository';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './films/entity/film.entity';
import { Schedule } from './films/entity/schedule.entity';
import { config } from './config';

@Module({
  imports: [
    //загружаем переменные окружения
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    //загружаем статические файлы - путь и URL
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public/content/afisha'),
      serveRoot: '/content/afisha',
    }),
    //подключение к БД
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.db.host,
      port: config.db.port,
      username: config.db.user,
      password: config.db.password,
      database: config.db.name,
      schema: config.db.schema,
      entities: [Film, Schedule]
    }),
    TypeOrmModule.forFeature([Film, Schedule]),
  ],
  controllers: [FilmsController, OrderController],
  providers: [configProvider, FilmsService, FilmsRepository, OrderService],
})
export class AppModule {}
