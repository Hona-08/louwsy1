import { ErrorMssgKey } from '../types'
import { CustomError } from './custom.error'

export class AuthError extends CustomError {
  statusCode = 401

  constructor(public message: ErrorMssgKey) {
    super(message)

    Object.setPrototypeOf(this, AuthError.prototype)
  }
}
