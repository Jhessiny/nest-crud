import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'reviews' })
export class ReviewMapping {
  @PrimaryColumn('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', {
    name: 'author_name',
    length: 200,
  })
  authorName: string;

  @Column('character varying', {
    name: 'text',
    length: 600,
  })
  text: string;

  @Column('uuid', { name: 'movie_id' })
  movieId: string;

  @BeforeInsert()
  defaultUUID() {
    this.id = this.id || uuid();
  }
}
