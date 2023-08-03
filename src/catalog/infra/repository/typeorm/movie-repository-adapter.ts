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
    console.log(createdMovie);
    const movieData = {
      id: 'b948fc5b-4367-41a8-bb1a-574d3adf4e75',
      name: 'Cinderela 2',
      premiereDate: '2023-07-20T18:54:32.935Z',
      directorId: 'd7bfc52d-4837-4cb7-bd0e-32269bcc27af',
      director: {
        id: 'd7bfc52d-4837-4cb7-bd0e-32269bcc27af',
        name: 'jhess',
        prizes: [],
        birthDate: '2023-07-20T18:54:32.935Z',
      },
      reviews: [
        {
          authorName: 'Jhesss',
          text: 'fff ofioio akwjhad kajsd wkej ekwejw',
          movieId: 'b948fc5b-4367-41a8-bb1a-574d3adf4e75',
        },
      ],
    };

    await this.connection
      .getConnection()
      .getRepository(MovieMapping)
      .save(movieData);
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
