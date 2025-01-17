import { Response } from 'express'

type SendTokenResponse = {
  statusCode: number
  token: string
  res: Response
}
export function sendTokenResponse({
  statusCode,
  token,
  res,
}: SendTokenResponse) {
  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: false,
  }

  if (process.env.NODE_ENV === 'production') {
    options.secure = true
  }

  res.status(statusCode).cookie('token', token, options).json({ token })
}
