import { Request, Response, NextFunction } from 'express'
import { isCelebrateError } from 'celebrate'

import { CustomError } from '../errors/custom.error'
import { errorMssgs, lang } from '../lang'
import { ErrorMssgKey } from '../types'
import { s3DeleteObject } from '../utils/aws/s3'

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  // for the customer error that we are throwing
  // from services
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json({ message: errorMssgs[req.lang][err.message as ErrorMssgKey] })
  }

  if (req.s3Params) {
    s3DeleteObject(req.s3Params)
  }

  // for joi validation
  if (isCelebrateError(err)) {
    const validation = []
    // eslint-disable-next-line no-restricted-syntax
    for (const [, joiError] of err.details.entries()) {
      validation.push({
        keys: joiError.details.map((detail) => detail.path.join('.')),
        message: joiError.message,
      })
    }

    return res.status(400).send(validation)
  }

  console.log(req.lang)
  console.log(err)

  res.status(500).json({ message: lang[req.lang].INTERNAL_SERVER_ERROR })
}
