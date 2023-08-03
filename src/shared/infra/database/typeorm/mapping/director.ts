import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { MovieMapping } from './movie';

@Entity({ name: 'directors' })
export class DirectorMapping {
  @PrimaryColumn('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', {
    name: 'name',
    length: 200,
  })
  name: string;

  @Column('character varying', { array: true, default: [], nullable: true })
  prizes: string[] | null;

  @Column('date', { name: 'birth_date' })
  birthDate: Date;

  @OneToMany(() => MovieMapping, (movie) => movie.directorId)
  @JoinColumn([{ name: 'director_id', referencedColumnName: 'id' }])
  movies: MovieMapping[];
}
