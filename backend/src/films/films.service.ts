import { Injectable } from '@nestjs/common';
import { filmsDTO } from './dto/films.dto';
import { FilmsRepository } from 'src/repository/films.repository';

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
}
