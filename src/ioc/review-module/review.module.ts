import { Module } from '@nestjs/common';
import { exportedReviewProviders, reviewProviders } from './review.providers';

@Module({
  providers: reviewProviders,
  exports: exportedReviewProviders,
})
export class ReviewModule {}
