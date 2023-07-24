import { type Validator } from '~/shared/validations/models';
import {
  MinLengthValidation,
  RequiredValidation,
  MaxLengthValidation,
  CustomValidation,
} from '../';
import { type ValidationError } from '~/shared/validations/models/validation-error';
import { REGEX } from '../constants';

export class ValidationBuilder {
  private constructor(
    private readonly value: unknown,
    private readonly property: string,
    private readonly validations: Validator[],
  ) {}

  static value(value: unknown, property: string): ValidationBuilder {
    return new ValidationBuilder(value, property, []);
  }

  build(): Validator[] {
    return this.validations;
  }

  min(length: number, message?: string): ValidationBuilder {
    this.validations.push(
      new MinLengthValidation(this.value, this.property, length, message),
    );
    return this;
  }

  max(length: number, message?: string): ValidationBuilder {
    this.validations.push(
      new MaxLengthValidation(this.value, this.property, length, message),
    );
    return this;
  }

  url(): ValidationBuilder {
    const message = 'Value is not a valid url';
    this.validations.push(
      new CustomValidation(this.value, this.property, REGEX.URL, message),
    );
    return this;
  }

  custom(pattern: RegExp, message?: string): ValidationBuilder {
    this.validations.push(
      new CustomValidation(this.value, this.property, pattern, message),
    );
    return this;
  }

  uuid(): ValidationBuilder {
    const message = 'Value should be a uuid';
    this.validations.push(
      new CustomValidation(this.value, this.property, REGEX.UUID, message),
    );
    return this;
  }

  required(message?: string): ValidationBuilder {
    this.validations.push(
      new RequiredValidation(this.value, this.property, message),
    );
    return this;
  }

  date(message?: string): ValidationBuilder {
    this.validations.push(
      new RequiredValidation(this.value, this.property, message),
    );
    return this;
  }

  trigger(): ValidationError[] | null {
    const validationResult = this.validations
      .flatMap((validation) => validation.validate()?.error)
      .filter((item) => item !== undefined);
    return validationResult.length > 0
      ? (validationResult as ValidationError[])
      : null;
  }
}
