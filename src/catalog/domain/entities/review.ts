import { ValidationBuilder } from '~/shared/validations/validators';
import { triggerValidation } from '~/shared/validations/validators-factory';

export class Review {
  private id: string;
  private authorName: string;
  private text: string;
  private movieId: string;

  constructor(input: Review.InputDTO) {
    Object.assign(this, input);
  }

  static create({ authorName, id, text, movieId }: Review.InputDTO) {
    const errors = triggerValidation([
      ValidationBuilder.value(authorName, 'authorName').required().build(),
      ValidationBuilder.value(id, 'id').required().uuid().build(),
      ValidationBuilder.value(text, 'text').required().min(10).build(),
      ValidationBuilder.value(movieId, 'movieId').required().uuid().build(),
    ]);
    if (errors) throw AggregateError(errors);
    return new Review({ authorName, id, text, movieId });
  }

  public getState(): Review.OutputDTO {
    return {
      id: this.id,
      authorName: this.authorName,
      text: this.text,
      movieId: this.movieId,
    };
  }
}

export namespace Review {
  export type InputDTO = {
    id: string;
    authorName: string;
    text: string;
    movieId: string;
  };

  export type OutputDTO = {
    id: string;
    authorName: string;
    text: string;
    movieId: string;
  };
}
