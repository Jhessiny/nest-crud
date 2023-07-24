import { ValidationBuilder } from '~/shared/validations/validators';
import { triggerValidation } from '~/shared/validations/validators-factory';

export class Movie {
  private id: string;
  private name: string;
  private premiereDate: Date;
  private directorId: string;

  constructor(input: Movie.InputDTO) {
    Object.assign(this, input);
  }

  static create({ directorId, id, name, premiereDate }: Movie.InputDTO) {
    const errors = triggerValidation([
      ValidationBuilder.value(directorId, 'directorId')
        .required()
        .uuid()
        .build(),
      ValidationBuilder.value(id, 'id').required().uuid().build(),
      ValidationBuilder.value(name, 'name').required().min(2).build(),
      ValidationBuilder.value(premiereDate, 'premiereDate')
        .required()
        .date()
        .build(),
    ]);
    if (errors) throw AggregateError(errors);
    return new Movie({ directorId, id, name, premiereDate });
  }

  getState() {
    return {
      id: this.id,
      name: this.name,
      premiereDate: this.premiereDate,
      directorId: this.directorId,
    };
  }
}

export namespace Movie {
  export type InputDTO = {
    id: string;
    name: string;
    premiereDate: Date;
    directorId: string;
  };
}
