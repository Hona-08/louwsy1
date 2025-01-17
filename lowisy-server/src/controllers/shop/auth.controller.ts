import { Request, Response } from 'express'
import { authConfig } from '../../config'
import { lang } from '../../lang'
import { shopAuthService } from '../../services/shop'
import { ReqLang } from '../../enums/lang'

/**
 * @route POST /api/shops/auth/initial-register
 * @access Public
 * @desc get the shop info & send verification mail (no insertion in the db)
 */
export async function initialRegister(req: Request, res: Response) {
  await shopAuthService.initialRegister(req.body, req.lang as ReqLang)
  res.status(200).json({
    message: lang[req.lang].VERIFY_EMAIL,
  })
}

/**
 * @route POST /api/shops/auth/final-register
 * @access Public
 * @desc verifies email & register webshop in the db
 */
export async function finalRegister(req: Request, res: Response) {
  await shopAuthService.confirmEmailAndRegisterShop(
    req.body,
    req.lang as ReqLang,
  )
  res.status(200).json({
    message: lang[req.lang].CREATED_SUCCESSFULLY,
  })
}

/**
 * @route POST /api/shops/auth/login
 * @access Public
 * @desc normal login by using email & password of webshop
 */
export async function login(req: Request, res: Response) {
  console.log('called')
  const token = await shopAuthService.loginByEmail(
    req.body,
    req.lang as ReqLang,
  )
  res
    .status(200)
    .cookie('token', token, authConfig.shop.cookieOptions)
    .json({ token })
}

/**
 * @route POST /api/shops/auth/forgot-password
 * @access Public
 * @desc send email to shop owner with password reset link
 */
export async function forgotPassword(req: Request, res: Response) {
  await shopAuthService.forgetPassword(req.body.email, req.lang as ReqLang)
  res.status(200).json({
    message: lang[req.lang].FORGOT_PASSWORD,
  })
}

/**
 * @route PUT /api/shops/auth/reset-password
 * @access Public
 * @desc update the shop with new password
 */
export async function resetPassword(req: Request, res: Response) {
  const token = await shopAuthService.resetPassword(req.body)
  res
    .status(200)
    .cookie('token', token, authConfig.shop.cookieOptions)
    .json({ token })
}

/**
 * @route POST /api/shops/auth/logout
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
