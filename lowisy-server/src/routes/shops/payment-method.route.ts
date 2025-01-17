import { Router } from 'express'
import { shopPaymentController } from '../../controllers/shop'
import { userAuthMiddleware } from '../../middlewares'

const router = Router()

router.get(
  '/',
  userAuthMiddleware.protect(),
  shopPaymentController.getPaymentMethodsOfShop,
)

router.get(
  '/payments',
  userAuthMiddleware.protect(),
  shopPaymentController.getPaymentMethods,
)
router.patch(
  '/',
  userAuthMiddleware.protect(),
  shopPaymentController.updatePaymentMethod,
)

export default router
