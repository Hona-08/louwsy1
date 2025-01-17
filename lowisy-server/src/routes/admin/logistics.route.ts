import { Router } from 'express'
import { adminLogisticsController } from '../../controllers/admin'
import { AdminAuthMiddleware } from '../../middlewares/admin'

const router = Router()

router.get(
  '/:shopId',
  AdminAuthMiddleware.protect(),
  adminLogisticsController.getDeliveryOption,
)
router.patch(
  '/:shopId',
  AdminAuthMiddleware.protect(),
  adminLogisticsController.updateDeliveryOption,
)

export default router
