import { Router } from 'express'
import { shopPolicyController } from '../../controllers/shop'
import { userAuthMiddleware } from '../../middlewares'

const router = Router()

router.get('/', userAuthMiddleware.protect(), shopPolicyController.getPolicies)

router.patch(
  '/policy',
  userAuthMiddleware.protect(),
  shopPolicyController.updatePolicy,
)

export default router
