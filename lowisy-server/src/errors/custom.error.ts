import { ErrorMssgKey } from '../types'

export abstract class CustomError extends Error {
  abstract statusCode: number

  constructor(message: ErrorMssgKey) {
    super(message as string)
    Object.setPrototypeOf(this, CustomError.prototype)
  }
}
