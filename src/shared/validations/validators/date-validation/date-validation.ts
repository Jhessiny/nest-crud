import { type Validator } from '~/shared/validations/models';
import { ValidationError } from '~/shared/validations/models/validation-error';
import { ERROR_TYPES } from '~/shared/validations/types';

export class MaxLengthValidation implements Validator {
  constructor(
    readonly value: unknown,
    readonly property: string,
    private readonly maxLength: number,
    private readonly message: string = 'Input length over the limit.',
  ) {}

  validate(): Validator.Error {
    if (!this.value) return null;

    if (
      typeof this.value === 'object' &&
      'getMonth' in this.value &&
      typeof this.value.getMonth === 'function'
    ) {
      return null;
    }

    return new ValidationError({
      property: this.property,
      message: `Value should be a valid Date`,
      name: ERROR_TYPES.MAX_LENGTH,
    });
  }
}
