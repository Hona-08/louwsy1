import { Router } from 'express'
import { shopCustomerController } from '../../controllers/shop'
import { userAuthMiddleware } from '../../middlewares'

const router = Router()

router.get(
  '/',
  userAuthMiddleware.protect(),
  shopCustomerController.getCustomers,
)

router.get(
  '/:customerId/orders',
  userAuthMiddleware.protect(),
  shopCustomerController.getCustomerOrders,
)

router.get(
  '/:customerId',
  userAuthMiddleware.protect(),
  shopCustomerController.getCustomer,
)

export default router
