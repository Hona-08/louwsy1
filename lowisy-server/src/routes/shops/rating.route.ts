import { Router } from 'express'
import {
  shopCategoryController,
  shopOrderController,
  shopRatingController,
} from '../../controllers/shop'
import { userAuthMiddleware } from '../../middlewares'
import { customerAuthMiddleware } from '../../middlewares/customers'

const router = Router()

router.post('/', customerAuthMiddleware.protect(), shopRatingController.create)

router.get(
  '/',
  customerAuthMiddleware.protect(),
  shopRatingController.getRatings,
)

router.get(
  '/:shopId',
  //customerAuthMiddleware.protect(),
  shopRatingController.getAverageRatingOfAShop,
)

router.post(
  '/customer',
  customerAuthMiddleware.protect(),
  shopRatingController.getRatingsoFSingleCustomer,
)

export default router
