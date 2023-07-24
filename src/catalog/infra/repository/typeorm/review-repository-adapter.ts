import { ReviewRepository } from '~/catalog/application';
import { Review } from '~/catalog/domain';
import { DatabaseConnection } from '~/shared/application/database';
import { ReviewMapping } from '~/shared/infra/database/typeorm/mapping';

export class ReviewRepositoryAdapter implements ReviewRepository {
  constructor(private readonly connection: DatabaseConnection) {}
  async save(input: Review) {
    await this.connection
      .getConnection()
      .getRepository(ReviewMapping)
      .save(input.getState());
  }

  async findByAuthorAndMovieId(
    authorName: string,
    movieId: string,
  ): Promise<Review> {
    const review = await this.connection
      .getConnection()
      .getRepository(ReviewMapping)
      .findOne({ where: { authorName, movieId } });

    return Review.create(review);
  }
}
