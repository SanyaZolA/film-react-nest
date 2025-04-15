import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Film } from './film.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Film, (film) => film.schedule)
  @JoinColumn({ name: 'filmId' })
  film: Film;

  @Column({ type: 'integer' })
  hall: number;

  @Column({ type: 'integer' })
  seats: number;

  @Column({ type: 'integer' })
  price: number;

  @Column({ type: 'text' })
  daytime: string;

  @Column('text', { default: '' })
  taken: string;

  @Column('integer')
  rows: number;

  @Column('uuid')
  filmId: string;
}
