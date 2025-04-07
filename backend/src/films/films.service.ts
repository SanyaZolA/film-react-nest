import { Injectable, NotFoundException } from '@nestjs/common';
import { filmsDTO } from './dto/films.dto';
import { FilmsRepository } from 'src/repository/films.repository';
import { ScheduleResponseDto } from './dto/schedule.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsrepository: FilmsRepository) {}

  async findAll(): Promise<{ total: number; items: filmsDTO[] }> {
    const films = await this.filmsrepository.findAll();
    return {
      total: films.length,
      items: films,
    };
  }

  async findById(id: string): Promise<ScheduleResponseDto | null> {
    const films = await this.filmsrepository.findById(id);

    if (!films) {
      throw new NotFoundException(`Фильм с ID ${id} не найден`);
    }
    return {
      total: films.schedule.length,
      items: films.schedule,
    };
  }
}
