/* eslint-disable prettier/prettier */
import axios from 'axios'
import { Router } from 'express'
import {
  customerController,
  customerOrderController,
} from '../../controllers/customer'
import { BadRequestError } from '../../errors'
import { lang } from '../../lang'
import { customerAuthMiddleware } from '../../middlewares/customers'
import { Discount } from '../../models/discount.model'
import { Shop } from '../../models'

const router = Router()

router.get(
  '/discount/:code',
  //customerAuthMiddleware.protect(),
  async (req, res) => {
    const code = req.params.code
    const restaurantId = req.query.restaurantId
    const customerEmail = req.query.email

    const { email: restaurantEmail } = await Shop.query()
      .where({ id: restaurantId })
      .first()

    const discount = await Discount.query().findOne({
      customerEmail,
      code,
      usedBy: 'customer',
      limit: 1,
      used: 0,
    })

    if (!discount) {
      throw new BadRequestError('DISCOUNT_CODE_INVALID')
    }

    const isRecommendedRestaurant = await Discount.query().findOne({
      customerEmail,
      code,
      usedBy: 'customer',
      limit: 1,
      used: 0,
      restaurantEmail,
    })

    if (!isRecommendedRestaurant) {
      throw new BadRequestError('DISCOUNT_CODE_INVALID_RESTAURANT')
    }

    res.status(200).json({
      message: lang[req.lang].FETCHED_SUCCESSFULLY,
      data: discount,
    })
  },
)

router.get(
  '/details',
  customerAuthMiddleware.protect(),
  customerController.getCustomer,
)
router.patch(
  '/details',
  customerAuthMiddleware.protect(),
  customerController.updateCustomer,
)

router.get(
  '/addresses',
  // customerAuthMiddleware.protect(),
  customerController.customerAddresses,
)

router.get(
  '/orders',
  customerAuthMiddleware.protect(),
  customerOrderController.getCustomerOrders,
)

router.get('/all-order-id', customerOrderController.getOrderIds)

router.get(
  '/orders/:orderId',
  customerAuthMiddleware.protect(),
  customerOrderController.getOrder,
)

router.post('/orders/', async (req, res) => {
  //PK75711_7a21c28e2f75:0Gq7Ej7LxYedMBEd
  const token = `PK75711_7a21c28e2f75:0Gq7Ej7LxYedMBEd`
  const encodedToken = Buffer.from(token).toString('base64')

  let total_discount_amount = 0
  if (req.body?.discountId) {
    const discount = await Discount.query().findOne({
      id: req.body.discountId,
      usedBy: 'customer',
      limit: 1,
      used: 0,
      customerEmail: req.customerInfo.email,
    })

    console.log({ discount })
    total_discount_amount = discount?.amount ?? 0
  }
  const discount_for_product =
    total_discount_amount / req.body.order_lines.length
  delete req.body.discountId
  const { data } = await axios.post(
    'https://api.playground.klarna.com/checkout/v3/orders',
    {
      ...req.body,
      order_amount: req.body.order_amount - total_discount_amount * 100,
      order_lines: req.body.order_lines.map((o: any) => ({
        ...o,
        total_amount: o.total_amount - discount_for_product * 100,
        total_discount_amount: discount_for_product * 100,
      })),
      total_discount_amount: total_discount_amount * 100,
      order_tax_amount: 0,
      merchant_urls: {
        terms: 'https://www.example.com/terms.html',
        checkout:
          'https://www.example.com/checkout.html?order_id={checkout.order.id}',
        confirmation:
          'http://localhost:3000/order-confirmation?order_id={checkout.order.id}',
        push: 'https://www.example.com/api/push?order_id={checkout.order.id}',
      },
    },
    {
      headers: { Authorization: 'Basic ' + encodedToken },
    },
  )

  res.json(data)
})

router.get(
  '/discount/:code',
  //customerAuthMiddleware.protect(),
  async (req, res) => {
    const code = req.params.code
    const restaurantId = req.query.restaurantId
    const customerEmail = req.query.email

    const { email: restaurantEmail } = await Shop.query()
      .where({ id: restaurantId })
      .first()

    const discount = await Discount.query().findOne({
      customerEmail,
      code,
      usedBy: 'customer',
      limit: 1,
      used: 0,
    })

    if (!discount) {
      throw new BadRequestError('DISCOUNT_CODE_INVALID')
    }

    const isRecommendedRestaurant = await Discount.query().findOne({
      customerEmail,
      code,
      usedBy: 'customer',
      limit: 1,
      used: 0,
      restaurantEmail,
    })

    if (!isRecommendedRestaurant) {
      throw new BadRequestError('DISCOUNT_CODE_INVALID_RESTAURANT')
    }

    res.status(200).json({
      message: lang[req.lang].FETCHED_SUCCESSFULLY,
      data: discount,
    })
  },
)

export default router
