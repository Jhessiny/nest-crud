import { type Validator } from '../models'
import { type ValidationsCompositor } from '../types/validations-compositor'

export class ValidationsComposite implements ValidationsCompositor {
  private constructor(private readonly validators: Validator[]) {}

  static build(validators: Validator[]): ValidationsComposite {
    return new ValidationsComposite(validators)
  }

  validateValues(): ValidationsCompositor.Return {
    const errors = []
    for (const validator of this.validators) {
      const errorState = validator.validate()

      if (errorState) errors.push(errorState)
    }

    return errors.length > 0 ? errors : null
  }
}
