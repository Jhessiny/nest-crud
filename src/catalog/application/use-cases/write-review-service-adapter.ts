import { WriteReviewTransactionAdapter } from '~/catalog/infra/transaction/typeorm/write-review-transaction';
import { WriteReviewService } from './contracts';

export class WriteReviewServiceAdapter implements WriteReviewService {
  constructor(
    private readonly writeReviewTransaction: WriteReviewTransactionAdapter,
  ) {}

  async execute({
    authorName,
    text,
    movie,
  }: WriteReviewService.InputDTO): Promise<WriteReviewService.OutputDTO> {
    const reviewOrError = await this.writeReviewTransaction.run({
      authorName,
      text,
      movie,
    });
    return reviewOrError;
  }
}
