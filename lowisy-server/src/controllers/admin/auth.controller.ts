/* eslint-disable prettier/prettier */
import { Request, Response } from 'express'
import { authConfig } from '../../config'
import { lang } from '../../lang'
import { adminAuthService } from '../../services/admin'

/**
 * @route POST /api/admin/auth/login
 * @access Public
 * @desc updates the user's status to EMAIL_VERIFIED,
 * still verification by admin is needed for successfull
 * registration
 */
export async function login(req: Request, res: Response) {
  const token = await adminAuthService.loginByEmail(req.body)
  res
    .status(200)
    .cookie('token', token, authConfig.admin.cookieOptions)
    .json({ token })
}

/**
 * @route POST /api/admin/auth/logout
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
