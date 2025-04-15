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
  @JoinColumn({ name: 'film_id' })
  film: Film;

  @Column({ type: 'integer', nullable: true })
  hall: number;

  @Column({ type: 'integer', nullable: true })
  seats: number;

  @Column({ type: 'integer', nullable: true })
  price: number;

  @Column({ type: 'text', nullable: true })
  daytime: string;

  @Column('text')
  taken: string[];

  @Column('integer')
  rows: number;
}
