import { ErrorMssgKey } from '../types'
import { CustomError } from './custom.error'

export class BadRequestError extends CustomError {
  statusCode = 400

  constructor(public message: ErrorMssgKey) {
    super(message)

    Object.setPrototypeOf(this, BadRequestError.prototype)
  }
}
