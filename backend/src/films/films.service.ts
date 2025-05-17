import { Injectable, Logger } from '@nestjs/common';
import { filmsDTO } from './dto/films.dto';
import { FilmsRepository } from '../repository/films.repository';
import { ScheduleResponseDto } from './dto/schedule.dto';

@Injectable()
export class FilmsService {
  private readonly logger = new Logger(FilmsService.name);
  constructor(private readonly filmsrepository: FilmsRepository) {}

  async findAll(): Promise<{ total: number; items: filmsDTO[] }> {
    this.logger.log('Запуск метода findAll');
    const films = await this.filmsrepository.findAll();
    this.logger.debug(`Входные данные:\n${JSON.stringify(films, null, 2)}`);
    return {
      total: films.length,
      items: films,
    };
  }

  async findById(id: string): Promise<ScheduleResponseDto> {
    this.logger.log('Запуск метода findId');
    const film = await this.filmsrepository.findById(id);
    this.logger.debug(`Входные данные:\n${JSON.stringify(film, null, 2)}`);
    return {
      total: film.schedule.length,
      items: film.schedule,
    };
  }
}
