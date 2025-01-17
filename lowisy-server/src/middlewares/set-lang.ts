import { NextFunction, Request, Response } from 'express'

export function setLang(req: Request, _res: Response, next: NextFunction) {
  if (req.headers['accept-language'] === 'de') {
    req.lang = 'de'
  } else {
    req.lang = 'en'
  }
  next()
}
