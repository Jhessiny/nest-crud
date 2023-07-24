import { Module } from '@nestjs/common';
import { CatalogController } from '~/catalog/infra/controllers/catalog.controller';
import { reviewProviders } from './review-module/review.providers';
import { movieProviders } from './movie-module/movie.module';

@Module({
  // imports: [ReviewModule],
  controllers: [CatalogController],
  providers: [...reviewProviders, ...movieProviders],
})
export class CatalogModule {}
