import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity('films')
export class Film {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'character varying', nullable: true })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  director: string;

  @Column({ type: 'integer', nullable: true })
  rating: number;

  @Column({ type: 'text', nullable: true })
  tags: string[];

  @Column({ type: 'character varying', nullable: true })
  image: string;

  @Column({ type: 'character varying', nullable: true })
  cover: string;

  @Column({ type: 'character varying', nullable: true })
  about: string;

  @Column({ type: 'character varying', nullable: true })
  description: string;

  @OneToMany(() => Schedule, (schedule) => schedule.film)
  schedule: Schedule[];
}
