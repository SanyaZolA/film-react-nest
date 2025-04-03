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

  async findAll(): Promise<filmsDTO[]> {
    return this.filmModel.find().exec() as unknown as filmsDTO[];
  }

  async findById(id: string): Promise<filmsDTO | null> {
    return (await this.filmModel.findOne({ id }).exec()) as unknown as filmsDTO;
  }
}
