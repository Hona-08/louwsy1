import { ErrorMssgKey } from '../types'
import { CustomError } from './custom.error'

export class ForbiddenError extends CustomError {
  statusCode = 403

  constructor(public message: ErrorMssgKey) {
    super(message)

    Object.setPrototypeOf(this, ForbiddenError.prototype)
  }
}
