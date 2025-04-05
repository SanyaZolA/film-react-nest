import { filmsScheduleDTO } from './schedule.dto';

export class filmsDTO {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  discription: string;
  schedule: filmsScheduleDTO[];
}
