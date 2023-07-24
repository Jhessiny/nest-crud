import { DatabaseConnection } from '~/shared/application/database';
import { SharedProviderEnum } from '../shared-constants';
import { FactoryProvider, Provider } from '@nestjs/common';
import { MovieDAO, MovieRepository } from '~/catalog/application';
import { GetMovieServiceAdapter } from '~/catalog/application/use-cases/get-movie-adapter';
import { GetMovieDAOAdapter } from '~/catalog/infra/dao/movie-dao-adapter';
import { MovieRepositoryAdapter } from '~/catalog/infra/repository/typeorm/movie-repository-adapter';
import { DeleteMovieService } from '~/catalog/application/use-cases/contracts/delete-movie';
import { DeleteMovieServiceAdapter } from '~/catalog/application/use-cases/delete-movie-service-adapter';

enum MovieProviderEnum {
  GetMovieDAO = 'GetMovieDAO',
  GetMovieService = 'GetMovieService',
  MovieRepository = 'MovieRepository',
  DeleteMovieService = 'DeleteMovieService',
}

const movieRepository: FactoryProvider<MovieRepository> = {
  provide: MovieProviderEnum.MovieRepository,
  useFactory: (connection: DatabaseConnection) =>
    new MovieRepositoryAdapter(connection),
  inject: [SharedProviderEnum.DatabaseConnection],
};

const deleteMovieService: FactoryProvider<DeleteMovieService> = {
  provide: MovieProviderEnum.DeleteMovieService,
  useFactory: (repository: MovieRepository) =>
    new DeleteMovieServiceAdapter(repository),
  inject: [MovieProviderEnum.MovieRepository],
};

const getMovieService: FactoryProvider<GetMovieServiceAdapter> = {
  provide: MovieProviderEnum.GetMovieService,
  useFactory: (getMovieDAO: MovieDAO) =>
    new GetMovieServiceAdapter(getMovieDAO),
  inject: [MovieProviderEnum.GetMovieDAO],
};

const getMovieDAO: FactoryProvider<GetMovieDAOAdapter> = {
  provide: MovieProviderEnum.GetMovieDAO,
  useFactory: (connection: DatabaseConnection) =>
    new GetMovieDAOAdapter(connection),
  inject: [SharedProviderEnum.DatabaseConnection],
};

export const movieProviders: Provider[] = [
  getMovieService,
  getMovieDAO,
  movieRepository,
  deleteMovieService,
];
