import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { filmsScheduleDTO } from '../dto/schedule.dto';
import { Schedule } from './schedule.schemas';

@Schema()
export class Film extends Document {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  director: string;

  @Prop({ required: true })
  tags: string[];

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  cover: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  about: string;

  @Prop({ required: true })
  discription: string;

  @Prop({ type: [filmsScheduleDTO], required: true })
  schedule: Schedule[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
