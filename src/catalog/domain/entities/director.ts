import { ValidationBuilder } from '~/shared/validations/validators';
import { triggerValidation } from '~/shared/validations/validators-factory';

export class Director {
  private id: string;
  private name: string;
  private birthDate: Date;
  private prizes: string[];

  private constructor(input: Director.InputDTO) {
    Object.assign(this, input);
  }

  static create({ birthDate, id, name, prizes }: Director.InputDTO) {
    const errors = triggerValidation([
      ValidationBuilder.value(id, 'id').required().min(3).build(),
      ValidationBuilder.value(birthDate, 'birthDate').required().date().build(),
      ValidationBuilder.value(name, 'name').required().min(3).build(),
    ]);
    if (errors) throw AggregateError(errors);

    return new Director({ birthDate, id, name, prizes });
  }

  getState() {
    return {
      id: this.id,
      name: this.name,
      birthDate: this.birthDate,
      prizes: this.prizes,
    };
  }
}

export namespace Director {
  export type InputDTO = {
    id: string;
    name: string;
    birthDate: Date;
    prizes: string[];
  };
}
