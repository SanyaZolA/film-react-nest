import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from '../films/films.service';
import { filmsDTO } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}
  @Get()
  async getFilms(): Promise<{ total: number; items: filmsDTO[] }> {
    return this.filmsService.findAll();
  }
  @Get(':id')
  find(@Param('id') id: string): string {
    return `Этот метод вернёт данные фильма с id ${id}`;
  }
}
