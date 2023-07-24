import { Review } from '~/catalog/domain';
import { ReviewRepository } from '../repository';
import { UpdateReviewService } from './contracts/update-review';

export class UpdateReviewServiceAdapter implements UpdateReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async execute({
    authorName,
    text,
    movieId,
  }: UpdateReviewService.InputDTO): Promise<UpdateReviewService.OutputDTO> {
    const existingReview = await this.reviewRepository.findByAuthorAndMovieId(
      authorName,
      movieId,
    );
    if (!existingReview) {
      throw new Error('Review not found');
    }
    const reviewInstance = Review.create({
      id: existingReview.getState().id,
      authorName: existingReview.getState().authorName,
      text,
      movieId,
    });
    const reviewOrError = await this.reviewRepository.save(reviewInstance);
    return reviewOrError;
  }
}
