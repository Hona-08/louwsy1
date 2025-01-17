import { Request, Response, NextFunction } from 'express'
import { authConfig } from '../../config'
import { UserFetch } from '../../enums'
import { AuthError, BadRequestError } from '../../errors'
import { HttpError } from '../../errors/http.error'
import { Shop } from '../../models'
import { verifyToken } from '../../utils'
const { secretKey } = authConfig.shop.login

type Fetch = `${UserFetch}`

export function protect(fetch?: Fetch[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    let token

    if (req.headers?.authorization?.startsWith('Bearer')) {
      // Set token from Bearer token in header
      token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies?.token) {
      // Set token from cookie
      token = req.cookies.token
    }
    // Make sure token exists
    if (!token) {
      throw new AuthError('UNAUTHORIZED_ACCESS')
    }

    const { shopId, exp } = verifyToken({ token, secretKey })
    req.authUser = await Shop.query().where({ id: shopId }).first()

    //Since it is a value of seconds from epoch, all you have to do is multiply exp by 1000.
    if (new Date(exp * 1000) < new Date()) {
      throw new HttpError(403, 'SESSION_EXPIRED')
    }

    next()
  }
}