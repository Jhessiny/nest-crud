export enum ERROR_TYPES {
  REQUIRED = 'REQUIRED_ERROR',
  MIN_LENGTH = 'MIN_LENGTH_ERROR',
  MAX_LENGTH = 'MAX_LENGTH_ERROR',
  DEPENDENCY = 'DEPENDENCY_ERROR',
  RELATION = 'RELATION_ERROR',
  REGEX = 'REGEX_ERROR',
}

export type ValidationErrorType = {
  message: string
  property?: string
  name: ERROR_TYPES
}
