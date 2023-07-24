import { DatabaseConnection } from '~/shared/application/database';
import { SharedProviderEnum } from '../shared-constants';
import { FactoryProvider, Provider } from '@nestjs/common';
import {
  ReviewRepository,
  WriteReviewServiceAdapter,
} from '~/catalog/application';
import { WriteReviewService } from '~/catalog/application/use-cases/contracts';
import { WriteReviewTransactionAdapter } from '~/catalog/infra/transaction/typeorm/write-review-transaction';
import { UpdateReviewService } from '~/catalog/application/use-cases/contracts/update-review';
import { UpdateReviewServiceAdapter } from '~/catalog/application/use-cases/update-review-service-adapter';
import { ReviewRepositoryAdapter } from '~/catalog/infra/repository/typeorm/review-repository-adapter';

enum ReviewProviderEnum {
  ReviewRepository = 'ReviewRepository',
  WriteReviewService = 'WriteReviewService',
  UpdateReviewService = 'UpdateReviewService',
  WriteReviewTransactionAdapter = 'WriteReviewTransactionAdapter',
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
  useFactory: (writeReviewTransaction: WriteReviewTransactionAdapter) =>
    new WriteReviewServiceAdapter(writeReviewTransaction),
  inject: [ReviewProviderEnum.WriteReviewTransactionAdapter],
};

const writeReviewTransaction: FactoryProvider<WriteReviewTransactionAdapter> = {
  provide: ReviewProviderEnum.WriteReviewTransactionAdapter,
  useFactory: (connection: DatabaseConnection) =>
    new WriteReviewTransactionAdapter(connection),
  inject: [SharedProviderEnum.DatabaseConnection],
};

export const reviewProviders: Provider[] = [
  writeReviewService,
  writeReviewTransaction,
  updateReviewService,
  reviewRepositoryProvider,
];

export const exportedReviewProviders: Provider[] = [
  reviewRepositoryProvider,
  writeReviewService,

  // writeReviewTransaction,
];
