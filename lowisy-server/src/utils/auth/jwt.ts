import jwt from 'jsonwebtoken'
import { AuthError } from '../../errors'
import { UserPayload } from '../../types'

type GenerateToken = {
  payload: UserPayload
  secretKey: jwt.Secret
  signOptions: jwt.SignOptions
}

export function generateToken({
  payload,
  secretKey,
  signOptions,
}: GenerateToken) {
  return jwt.sign(payload, secretKey, signOptions)
}

type VerifyToken = {
  token: string
  secretKey: jwt.Secret
}

export function verifyToken({ token, secretKey }: VerifyToken) {
  try {
    const payload = jwt.verify(token, secretKey) as UserPayload
    return payload
  } catch (error) {
    throw new AuthError('SESSION_EXPIRED')
  }
}
