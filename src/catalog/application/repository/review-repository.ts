import { Review } from '~/catalog/domain';

export interface ReviewRepository {
  save(input: Review): Promise<void>;
  // update(input: Review): Promise<void>;
  findByAuthorAndMovieId(authorName: string, movieId: string): Promise<Review>;
}
