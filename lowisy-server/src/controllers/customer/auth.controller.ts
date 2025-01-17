import { Request, Response } from 'express'
import { customerAuthController, customerController } from '.'
import { authConfig } from '../../config'
import { lang } from '../../lang'
import { customerAuthService, customerService } from '../../services/customer'
import { verifyToken } from '../../utils'
import { ReqLang } from '../../enums/lang'
const { secretKey } = authConfig.customer.login

/**
 * @route POST /api/customers/auth/initial-register
 * @access Public
 * @desc get the shop info & send verification mail (no insertion in the db)
 */
export async function register(req: Request, res: Response) {
  await customerAuthService.register(req.body, req.lang as ReqLang)
  res.status(200).json({
    message: lang[req.lang].CREATED_SUCCESSFULLY,
  })
}

export async function confirmEmail(req: Request, res: Response) {
  await customerAuthService.confirmEmail(req.params.token)

  res.redirect(`${process.env.WEB_SHOP_URL}/login`)
}

export async function refreshToken(req: Request, res: Response) {
  let token

  if (req.headers?.authorization?.startsWith('Bearer')) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies?.token) {
    // Set token from cookie
    token = req.cookies.token
  }

  const { customerId } = verifyToken({ token, secretKey })

  const user = await customerService.getCustomer(customerId)

  res
    .status(200)
    .cookie('token', token, authConfig.customer.cookieOptions)
    .json({ token, user })
}

/**
 * @route POST /api/customers/auth/login
 * @access Public
 * @desc normal login by using email & password of webshop
 */
export async function login(req: Request, res: Response) {
  const token = await customerAuthService.loginByEmail(req.body)

  res
    .status(200)
    .cookie('token', token, authConfig.shop.cookieOptions)
    .json({ token })
}

/**
 * @route POST /api/customers/auth/forgot-password
 * @access Public
 * @desc send email to shop owner with password reset link
 */
export async function forgotPassword(req: Request, res: Response) {
  await customerAuthService.forgetPassword(req.body.email, req.lang as ReqLang)
  res.status(200).json({
    message: lang[req.lang].FORGOT_PASSWORD,
  })
}

/**
 * @route PUT /api/customers/auth/reset-password
 * @access Public
 * @desc update the shop with new password
 */
export async function resetPassword(req: Request, res: Response) {
  const token = await customerAuthService.resetPassword(req.body)
  res
    .status(200)
    .cookie('token', token, authConfig.shop.cookieOptions)
    .json({ token })
}

/**
 * @route POST /api/customers/auth/logout
 * @access Private
 * @desc clears the cookies
 */
export async function logout(req: Request, res: Response) {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  })
  res.status(200).json({
    message: lang[req.lang].SUCCESS,
  })
}
