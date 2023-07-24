import { type ValidationError } from './validation-error'

export interface Validator {
  value: Validator.Property
  validate: () => Validator.Error
}

export namespace Validator {
  export type Property = unknown
  export type Error = ValidationError | null
}
