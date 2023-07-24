import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { DirectorMapping } from './director';

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

  @BeforeInsert()
  defaultUUID() {
    this.id = this.id || uuid();
  }

  @ManyToOne(() => DirectorMapping)
  @JoinColumn([{ name: 'director_id', referencedColumnName: 'id' }])
  director: DirectorMapping;
}
