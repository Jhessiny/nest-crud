import { type ValidationErrorType } from '../types/validation'

export class ValidationError extends Error {
  // eslint-disable-next-line n/handle-callback-err
  constructor(public error: ValidationErrorType) {
    super(error.message)
  }
}
