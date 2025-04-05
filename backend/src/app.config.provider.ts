import { ConfigModule, ConfigService } from '@nestjs/config';

export const configProvider = {
  imports: [
    // добавляем в ConfigModule переменные окружения БД
    ConfigModule.forRoot({
      load: [
        () => ({
          database: {
            driver: process.env.DATABASE_DRIVER || 'mongodb',
            url: process.env.DATABASE_URL || 'mongodb://localhost:27017',
          },
        }),
      ],
    }),
  ],
  //провайдер для получения параметров
  provide: 'CONFIG',
  //получаем строки к БД в CONFIG
  useFactory: async (configService: ConfigService) => {
    return {
      database: {
        driver: configService.get<string>('database.driver'),
        url: configService.get<string>('database.url'),
      },
    };
  },
  inject: [ConfigService],
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
}
