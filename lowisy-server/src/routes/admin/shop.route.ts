import axios from 'axios'
import { Router } from 'express'
import { adminShopController } from '../../controllers/admin'
import { AdminAuthMiddleware } from '../../middlewares/admin'
import { PricingPlans } from '../../models'

const router = Router()

router.get('/', AdminAuthMiddleware.protect(), adminShopController.getShops)
router.get(
  '/:shopId/details',
  AdminAuthMiddleware.protect(),
  adminShopController.getShopDetails,
)
router.get(
  '/:shopId/products',
  AdminAuthMiddleware.protect(),
  adminShopController.getProductsOfSingleShop,
)

router.patch(
  '/is-active',
  AdminAuthMiddleware.protect(),
  adminShopController.updateShopStatus,
)

export default router
