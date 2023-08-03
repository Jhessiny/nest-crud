import { Movie } from '~/catalog/domain';

export interface MovieRepository {
  delete(id: string): Promise<void>;
  save(input: Movie): Promise<void>;
  findOne({
    name,
    premiereDate,
  }: {
    name: string;
    premiereDate: Date;
  }): Promise<Movie>;
}
