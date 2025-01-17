import { Router } from 'express'
import { adminPolicyController } from '../../controllers/admin'
import { AdminAuthMiddleware } from '../../middlewares/admin'

const router = Router()

router.get(
  '/:shopId',
  AdminAuthMiddleware.protect(),
  adminPolicyController.getPolicies,
)
router.patch(
  '/policy/:shopId',
  AdminAuthMiddleware.protect(),
  adminPolicyController.updatePolicy,
)

export default router
