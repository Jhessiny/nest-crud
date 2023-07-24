import { type ValidationError } from '../models/validation-error'

export interface ValidationsCompositor {
  validateValues: () => ValidationsCompositor.Return
}

export namespace ValidationsCompositor {
  export type Return = ValidationError[] | null
}
