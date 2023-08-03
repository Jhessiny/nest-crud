import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { MovieMapping } from './movie';

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

  @ManyToOne(() => MovieMapping, (movie) => movie.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  movie: MovieMapping;
}
