/* eslint-disable prettier/prettier */
import { Router } from 'express'
import { adminCategoriesController } from '../../controllers/admin'
import { shopDeliveryController } from '../../controllers/shop'
import { userAuthMiddleware } from '../../middlewares'
import { adminCategoriesValidator } from '../../validators'
const router = Router()

router.get(
  '/delivery-name',
  //userAuthMiddleware.protect(),
  shopDeliveryController.getDeliveries,
)

export default router
