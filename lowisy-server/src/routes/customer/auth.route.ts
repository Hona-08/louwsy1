/* eslint-disable prettier/prettier */
import { Router } from 'express'
import passport from 'passport'
import { authConfig } from '../../config'
import { customerAuthController } from '../../controllers/customer'
import { customerAuthMiddleware } from '../../middlewares/customers'
import { isLoggedIn } from '../../middlewares/isLoggedIn'
import { Customer } from '../../models/customer'
import { generateToken } from '../../utils'

const router = Router()

router.post('/register', customerAuthController.register)
router.post('/login', customerAuthController.login)
router.get('/confirm-email/:token', customerAuthController.confirmEmail)
router.get(
  '/refresh-token',
  customerAuthMiddleware.protect(),
  customerAuthController.refreshToken,
)

router.post('/logout', customerAuthController.logout)
router.post(
  '/forgot-password',

  customerAuthController.forgotPassword,
)
router.put('/reset-password', customerAuthController.resetPassword)

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
)

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/api/customers/auth/profile',
    failureRedirect: '/api/customers/auth/failed',
  }),
)

router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }))

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/api/customers/auth/profile',
    failureRedirect: '/api/customers/auth/failed',
  }),
)

router.get('/profile', isLoggedIn, async function (req: any, res) {
  console.log({ req: req.user })
  const email = req.user.emails[0].value

  const userRegistered = await Customer.query().where({ email }).first()

  console.log({ userRegistered })
  if (userRegistered) {
    console.log('link', process.env.WEB_SHOP_URL)
    authConfig.customer.login.payload = {
      customerId: userRegistered.id,
      email,
      name: userRegistered.name,
    }
    const token = generateToken(authConfig.customer.login)
    res.cookie('token', token, authConfig.customer.cookieOptions)
    res.redirect(`${process.env.WEB_SHOP_URL}`)
    return
  }

  res.redirect(`${process.env.WEB_SHOP_URL}/login`)
})

router.get('/failed', function (req, res) {
  res.redirect(`${process.env.WEB_SHOP_URL}/login`)
})

export default router
