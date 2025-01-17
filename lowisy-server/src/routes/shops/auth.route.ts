/* eslint-disable prettier/prettier */
import { Router } from 'express'
import { shopAuthController } from '../../controllers/shop'
import { shopAuthValidator } from '../../validators'

const router = Router()

router.post(
  '/initial-register',
  shopAuthValidator.initialRegister,
  shopAuthController.initialRegister,
)
router.post(
  '/final-register',
  shopAuthValidator.confirmEmailAndRegisterShop,
  shopAuthController.finalRegister,
)
router.post('/login', shopAuthValidator.login, shopAuthController.login)
router.post('/logout', shopAuthController.logout)
router.post(
  '/forgot-password',
  shopAuthValidator.forgotPassword,
  shopAuthController.forgotPassword,
)
router.put(
  '/reset-password',
  shopAuthValidator.resetPassword,
  shopAuthController.resetPassword,
)

export default router
