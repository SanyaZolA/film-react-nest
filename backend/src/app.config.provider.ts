import { ConfigModule, ConfigService } from '@nestjs/config';

export const configProvider = {
  imports: [
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
  provide: 'CONFIG',
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
