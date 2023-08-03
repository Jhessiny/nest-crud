import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { DirectorMapping } from './director';
import { ReviewMapping } from './review';

@Entity({ name: 'movies' })
export class MovieMapping {
  @PrimaryColumn('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', {
    name: 'name',
    length: 200,
  })
  name: string;

  @Column('date', { name: 'premiere_date' })
  premiereDate: Date;

  @Column('uuid', { name: 'director_id' })
  directorId: string;

  @ManyToOne(() => DirectorMapping, (director) => director.movies, {
    eager: true,
    cascade: ['insert', 'update'],
  })
  @JoinColumn([{ name: 'director_id', referencedColumnName: 'id' }])
  director: DirectorMapping;

  @OneToMany(() => ReviewMapping, (review) => review.movie, {
    eager: true,
    cascade: ['insert', 'update'],
  })
  reviews: ReviewMapping[];
}
