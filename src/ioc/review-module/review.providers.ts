import { DatabaseConnection } from '~/shared/application/database';
import { SharedProviderEnum } from '../shared-constants';
import { FactoryProvider, Provider } from '@nestjs/common';
import {
  MovieRepository,
  ReviewRepository,
  WriteReviewServiceAdapter,
} from '~/catalog/application';
import { WriteReviewService } from '~/catalog/application/use-cases/contracts';
import { UpdateReviewService } from '~/catalog/application/use-cases/contracts/update-review';
import { UpdateReviewServiceAdapter } from '~/catalog/application/use-cases/update-review-service-adapter';
import { ReviewRepositoryAdapter } from '~/catalog/infra/repository/typeorm/review-repository-adapter';
import { MovieProviderEnum } from '../movie-module/movie.module';

enum ReviewProviderEnum {
  ReviewRepository = 'ReviewRepository',
  WriteReviewService = 'WriteReviewService',
  UpdateReviewService = 'UpdateReviewService',
  WriteReviewTransactionAdapter = 'WriteReviewTransactionAdapter',
  MovieRepository = 'MovieRepository',
}

const reviewRepositoryProvider: FactoryProvider<ReviewRepository> = {
  provide: ReviewProviderEnum.ReviewRepository,
  useFactory: (connection: DatabaseConnection) =>
    new ReviewRepositoryAdapter(connection),
  inject: [SharedProviderEnum.DatabaseConnection],
};

const updateReviewService: FactoryProvider<UpdateReviewService> = {
  provide: ReviewProviderEnum.UpdateReviewService,
  useFactory: (reviewRepository: ReviewRepository) =>
    new UpdateReviewServiceAdapter(reviewRepository),
  inject: [ReviewProviderEnum.ReviewRepository],
};

const writeReviewService: FactoryProvider<WriteReviewService> = {
  provide: ReviewProviderEnum.WriteReviewService,
  useFactory: (movieRepository: MovieRepository) =>
    new WriteReviewServiceAdapter(movieRepository),
  inject: [MovieProviderEnum.MovieRepository],
};

export const reviewProviders: Provider[] = [
  writeReviewService,
  updateReviewService,
  reviewRepositoryProvider,
];

export const exportedReviewProviders: Provider[] = [
  reviewRepositoryProvider,
  writeReviewService,

  // writeReviewTransaction,
];
