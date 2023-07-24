import { type Validator } from '~/shared/validations/models';
import { ValidationError } from '~/shared/validations/models/validation-error';
import { ERROR_TYPES } from '~/shared/validations/types';

export class MinLengthValidation implements Validator {
  constructor(
    readonly value: unknown,
    readonly property: string,
    private readonly maxLength: number,
    private readonly message: string = 'Input length under the limit.',
  ) {}

  validate(): Validator.Error {
    if (!this.value) return null;

    if (typeof this.value !== 'string' && !Array.isArray(this.value))
      return new ValidationError({
        property: this.property,
        message: `Unable to validate input value.`,
        name: ERROR_TYPES.MIN_LENGTH,
      });

    const inputData = this.value as string;
    if (inputData?.length < this.maxLength)
      return new ValidationError({
        property: this.property,
        message: `${this.message}`,
        name: ERROR_TYPES.MIN_LENGTH,
      });

    return null;
  }
}
