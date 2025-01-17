/* eslint-disable prettier/prettier */
import { Router } from 'express'
import { adminDeliveryController } from '../../controllers/admin'
import { AdminAuthMiddleware } from '../../middlewares/admin'
const router = Router()

router.get(
  '/delivery-name',
  AdminAuthMiddleware.protect(),
  adminDeliveryController.getDeliveries,
)

export default router
