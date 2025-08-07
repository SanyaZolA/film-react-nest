import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../films/entity/film.entity';
import { filmsDTO } from '../films/dto/films.dto';
import { Schedule } from '../films/entity/schedule.entity';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  private toFilmDto(film: Film): filmsDTO {
    return {
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags,
      image: film.image,
      cover: film.cover,
      title: film.title,
      about: film.about,
      description: film.description,
      schedule: film.schedule,
    };
  }

  // Получение всех фильмов из БД
  async findAll(): Promise<filmsDTO[]> {
    const films = await this.filmRepository.find();
    return films.map(this.toFilmDto) as filmsDTO[];
  }

  // Получение фильма по ID из БД
  async findById(id: string): Promise<filmsDTO | null> {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });
    if (film) {
      // Сортируем расписание по времени сеанса на уровне приложения
      film.schedule = film.schedule.sort((a, b) =>
        a.daytime.localeCompare(b.daytime),
      );
      return this.toFilmDto(film) as filmsDTO;
    }
    return null;
  }

  async addTaken(scheduleId: string, newSeats: string[]) {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: scheduleId },
    });

    if (!schedule) {
      throw new Error('Расписание не найдено');
    }
    const currentTaken = schedule.taken ? schedule.taken.split(',') : [];

    const updated = Array.from(new Set([...currentTaken, ...newSeats]));
    schedule.taken = updated.join(',');
    await this.scheduleRepository.save(schedule);
  }

  async deleteTaken(scheduleId: string, newSeats: string[]) {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: scheduleId },
    });

    if (!schedule) {
      throw new Error('Расписание не найдено');
    }
    const currentTaken = schedule.taken ? schedule.taken.split(',') : [];

    const updated = currentTaken.filter((seat) => !newSeats.includes(seat));
    schedule.taken = updated.join(',');
    await this.scheduleRepository.save(schedule);
  }
}
