import { Router } from 'express'
import { Request, Response, NextFunction } from 'express'
import { shopOrderController } from '../../controllers/shop'
import { userAuthMiddleware } from '../../middlewares'
import { customerAuthMiddleware } from '../../middlewares/customers'
import { Shop } from '../../models'
import { verifyToken } from '../../utils'
import { authConfig } from '../../config'
import { Customer } from '../../models/customer'
const { secretKey } = authConfig.customer.login

const router = Router()

router.get('/', userAuthMiddleware.protect(), shopOrderController.getOrders)

router.get('/find-my-order', shopOrderController.findMyOrder)

router.get(
  '/status',
  userAuthMiddleware.protect(),
  shopOrderController.getOrderStatus,
)

router.post(
  '/',
  // async function (req: Request, res: Response, next: NextFunction) {
  //   let token

  //   if (req.headers?.authorization?.startsWith('Bearer')) {
  //     // Set token from Bearer token in header
  //     token = req.headers.authorization.split(' ')[1]
  //   } else if (req.cookies?.token) {
  //     // Set token from cookie
  //     token = req.cookies.token
  //   }
  //   console.log(Boolean(token))
  //   // Make sure token exists
  //   if (token) {
  //     const { customerId, exp } = verifyToken({ token, secretKey })

  //     req.customerInfo = await Customer.query()
  //       .where({ id: customerId })
  //       .first()
  //   }

  //   next()
  // },
  shopOrderController.createOrder,
)

router.post(
  '/shipping-address',
  //customerAuthMiddleware.protect(),
  shopOrderController.saveShippingAddress,
)

router.get(
  '/:orderId',
  userAuthMiddleware.protect(),
  shopOrderController.getOrder,
)

router.delete(
  '/:orderId',
  userAuthMiddleware.protect(),
  shopOrderController.deleteOrder,
)

router.patch(
  '/:orderId',
  userAuthMiddleware.protect(),
  shopOrderController.updateOrder,
)

export default router
