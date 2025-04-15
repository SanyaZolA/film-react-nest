import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../films/entity/film.entity';
import { filmsDTO } from '../films/dto/films.dto';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
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
    return this.toFilmDto(film) as filmsDTO;
  }
}
