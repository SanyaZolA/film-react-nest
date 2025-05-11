import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from '../films/films.service';
import { filmsDTO } from './dto/films.dto';
import { ScheduleResponseDto } from './dto/schedule.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}
  @Get()
  async getFilms(): Promise<{ total: number; items: filmsDTO[] }> {
    return this.filmsService.findAll();
  }
  @Get(':id/schedule')
  find(@Param('id') id: string): Promise<ScheduleResponseDto> {
    return this.filmsService.findById(id);
  }
}
