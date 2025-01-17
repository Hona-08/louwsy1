/* eslint-disable prettier/prettier */
import { Router } from 'express'
import { adminPricingController } from '../../controllers/admin'
import { AdminAuthMiddleware } from '../../middlewares/admin'
import { adminPricingPlanValidator } from '../../validators'
const router = Router()

router.get('/', adminPricingController.getPricePlans)
router.get(
  '/:pricePlanId',
  AdminAuthMiddleware.protect(),
  adminPricingPlanValidator.getPricePlan,
  adminPricingController.getPricePlan,
)
router.delete(
  '/:pricePlanId',
  AdminAuthMiddleware.protect(),
  adminPricingPlanValidator.deletePricePlan,
  adminPricingController.deletePricePlan,
)
router.put(
  '/:pricePlanId',
  AdminAuthMiddleware.protect(),
  adminPricingPlanValidator.updatePricePlan,
  adminPricingController.updatePricePlan,
)
router.post(
  '/',
  AdminAuthMiddleware.protect(),
  adminPricingPlanValidator.createPricePlan,
  adminPricingController.createPricePlan,
)
export default router
