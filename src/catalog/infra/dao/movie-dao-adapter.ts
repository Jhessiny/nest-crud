import { DataSource } from 'typeorm';
import { MovieDAO } from '~/catalog/application';
import { DatabaseConnection } from '~/shared/application/database';
import {
  DirectorMapping,
  MovieMapping,
  ReviewMapping,
} from '~/shared/infra/database/typeorm/mapping';

export class GetMovieDAOAdapter implements MovieDAO {
  constructor(private readonly connection: DatabaseConnection<DataSource>) {}
  async findOneById(id: string): Promise<MovieDAO.OutputDTO> {
    const movieData = await this.connection
      .getConnection()
      .getRepository(MovieMapping)
      .createQueryBuilder('movie')
      .andWhere('movie.id = :id', { id })
      .leftJoinAndMapMany(
        'movie.director',
        DirectorMapping,
        'director',
        'director.id = movie.directorId',
      )
      .getOne();

    const reviewsData = await this.connection
      .getConnection()
      .getRepository(ReviewMapping)
      .find({ where: { movieId: id } });

    return {
      id: movieData?.id,
      name: movieData?.name,
      premiereDate: movieData?.premiereDate,
      director: movieData?.director,
      reviews: reviewsData,
    };
  }
}
