import { ValidationBuilder } from '~/shared/validations/validators';
import { triggerValidation } from '~/shared/validations/validators-factory';
import { Review } from './review';
import { Director } from './director';
import { IdGenerator } from '~/shared/infra/id-generator';

export class Movie {
  private id: string;
  private name: string;
  private premiereDate: Date;
  private director: Director;
  private reviews: Review[];

  constructor(input: Movie.InputDTO) {
    const director = Director.create({
      id: IdGenerator.generate(),
      ...input.director,
    });
    const reviewsEntities = input.reviews.map((review) =>
      Review.create({
        id: IdGenerator.generate(),
        movieId: input.id,
        ...review,
      }),
    );
    Object.assign(this, { ...input, director, reviews: reviewsEntities });
  }

  static create({ director, id, name, premiereDate, reviews }: Movie.InputDTO) {
    const errors = triggerValidation([
      ValidationBuilder.value(id, 'id').required().uuid().build(),
      ValidationBuilder.value(name, 'name').required().min(2).build(),
      ValidationBuilder.value(premiereDate, 'premiereDate')
        .required()
        .date()
        .build(),
    ]);
    if (errors) throw AggregateError(errors);
    return new Movie({ director, id, name, premiereDate, reviews });
  }

  getState() {
    return {
      id: this.id,
      name: this.name,
      premiereDate: this.premiereDate,
      director: this.director,
      reviews: this.reviews,
    };
  }
}

export namespace Movie {
  export type InputDTO = {
    id: string;
    name: string;
    premiereDate: Date;
    director: {
      name: string;
      birthDate: Date;
      prizes: string[];
    };
    reviews: Array<{ text: string; authorName: string }>;
  };
}
