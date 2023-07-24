import { type Validator } from './models'
import { type ValidationsCompositor } from './types/validations-compositor'
import { ValidationsComposite } from './validators/validation-composite'

export const triggerValidation = (
  validations: Validator[][],
): ValidationsCompositor.Return => {
  return ValidationsComposite.build(validations.flat()).validateValues()
}
