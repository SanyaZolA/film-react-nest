import { Injectable, Logger } from '@nestjs/common';
import { filmsDTO } from './dto/films.dto';
import { FilmsRepository } from 'src/repository/films.repository';
import { ScheduleResponseDto } from './dto/schedule.dto';

@Injectable()
export class FilmsService {
  private readonly logger = new Logger(FilmsService.name);
  constructor(private readonly filmsrepository: FilmsRepository) {}

  async findAll(): Promise<{ total: number; items: filmsDTO[] }> {
    const films = await this.filmsrepository.findAll();
    this.logger.log('Запуск метода findAll');
    this.logger.debug(`Входные данные:\n${JSON.stringify(films, null, 2)}`);
    return {
      total: films.length,
      items: films,
    };
  }

  async findById(id: string): Promise<ScheduleResponseDto> {
    const films = await this.filmsrepository.findById(id);
    this.logger.log('Запуск метода findAll');
    this.logger.debug(`Входные данные:\n${JSON.stringify(films, null, 2)}`);
    return {
      total: films.schedule.length,
      items: films.schedule,
    };
  }
}
