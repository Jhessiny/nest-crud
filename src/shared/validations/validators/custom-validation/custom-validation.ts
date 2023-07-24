import { type Validator } from '~/shared/validations/models';
import { ValidationError } from '~/shared/validations/models/validation-error';
import { ERROR_TYPES } from '~/shared/validations/types';

export class CustomValidation implements Validator {
  constructor(
    readonly value: unknown,
    readonly property: string,
    private readonly pattern: RegExp,
    private readonly message: string = 'Value should respect pattern.',
  ) {}

  validate(): Validator.Error {
    if (!this.value) return null;
    if (typeof this.value !== 'string')
      return new ValidationError({
        property: this.property,
        message: `Value must be a string`,
        name: ERROR_TYPES.REGEX,
      });

    if (!this.pattern.test(this.value))
      return new ValidationError({
        property: this.property,
        message: `${this.message}`,
        name: ERROR_TYPES.REGEX,
      });

    return null;
  }
}
