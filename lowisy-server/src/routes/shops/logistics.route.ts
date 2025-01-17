import { Router } from 'express'
import { shopLogisticController } from '../../controllers/shop'
import { userAuthMiddleware } from '../../middlewares'

const router = Router()

router.get(
  '/',
  userAuthMiddleware.protect(),
  shopLogisticController.getDeliveryOption,
)
router.patch(
  '/',
  userAuthMiddleware.protect(),
  shopLogisticController.updateDeliveryOption,
)

export default router
