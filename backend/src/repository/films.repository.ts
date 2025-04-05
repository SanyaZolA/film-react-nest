import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Film } from '../films/shemas/films.schemas';
import { Model } from 'mongoose';
import { filmsDTO } from '../films/dto/films.dto';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectModel(Film.name) private readonly filmModel: Model<Film>,
  ) {}

  // Преобразование фильма в DTO
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
      discription: film.discription,
      schedule: film.schedule,
    };
  }

  // Получение всех фильмов из БД
  async findAll(): Promise<filmsDTO[]> {
    const films = await this.filmModel.find().exec();
    return films.map(this.toFilmDto);
  }

  // Получение фильма по ID из БД
  async findById(id: string): Promise<filmsDTO | null> {
    const film = await this.filmModel.findOne({ id }).exec();
    return film ? this.toFilmDto(film) : null; // Если фильм найден, преобразуем, если нет - возвращаем null
  }
}
