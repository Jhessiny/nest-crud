import { DataSource } from 'typeorm';
import { MovieRepository } from '~/catalog/application';
import { Movie } from '~/catalog/domain';
import { DatabaseConnection } from '~/shared/application/database';
import {
  MovieMapping,
  ReviewMapping,
} from '~/shared/infra/database/typeorm/mapping';

export class MovieRepositoryAdapter implements MovieRepository {
  constructor(private readonly connection: DatabaseConnection<DataSource>) {}
  async delete(id: string) {
    await this.connection.getConnection().transaction(async (manager) => {
      await manager.getRepository(MovieMapping).delete(id);
      await manager.getRepository(ReviewMapping).delete({ movieId: id });
    });
  }

  async save(movie: Movie) {
    const createdMovie = await this.connection
      .getConnection()
      .getRepository(MovieMapping)
      .create({
        ...movie.getState(),
        director: movie.getState().director.getState(),
        reviews: movie.getState().reviews.map((review) => review.getState()),
      });
    console.log({ createdMovie });

    await this.connection
      .getConnection()
      .getRepository(MovieMapping)
      .save(createdMovie);
  }

  async findOne({ name, premiereDate }: { name: string; premiereDate: Date }) {
    const repository = this.connection
      .getConnection()
      .getRepository(MovieMapping);
    const movie = await repository.findOne({
      where: { name, premiereDate },
    });

    return movie ? Movie.create(movie) : null;
  }
}
