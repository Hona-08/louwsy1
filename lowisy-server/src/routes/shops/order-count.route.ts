import { Router } from 'express'
import { shopOrderCountController } from '../../controllers/shop'
import { userAuthMiddleware } from '../../middlewares'

const router = Router()

router.get(
  '/total-orders',
  userAuthMiddleware.protect(),
  shopOrderCountController.getTotalOrders,
)
router.get(
  '/total-pending-orders',
  userAuthMiddleware.protect(),
  shopOrderCountController.getPendingOrders,
)
router.get(
  '/total-today-orders',
  userAuthMiddleware.protect(),
  shopOrderCountController.getTodayOrders,
)

export default router
