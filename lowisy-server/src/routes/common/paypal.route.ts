/* eslint-disable prettier/prettier */
import { Router } from 'express'
import { paypalController } from '../../controllers/common'
import { PricingPlans, Shop, ShopRechargeLogs } from '../../models'
import axios from 'axios'
import { addDaysToGivenDate, sendEmail } from '../../utils'
import { Discount } from '../../models/discount.model'
import { templateWelcomeToLowisyInvoice } from '../../constants/email-templates'
import { generateAccessToken } from '../../services/common/paypal.service'
import { userAuthMiddleware } from '../../middlewares'

const router = Router()

router.post(
  '/create-order',
  userAuthMiddleware.protect(),
  paypalController.createOrder,
)

router.post('/create-restaurant-order', paypalController.createRestaurantOrder)

router.post('/capture-order/:orderId', paypalController.captureOrder)
router.post(
  '/buy-shop-plan-success/:orderId',
  userAuthMiddleware.protect(),
  async (req, res) => {
    const orderId = req.params.orderId
    const { id: shopId, name, email } = req.authUser
    console.log({ paypal_order_id: orderId })

    const alreadyRecharged = await ShopRechargeLogs.query().findOne({
      paypalOrderId: orderId,
    })
    if (alreadyRecharged) return

    const accessToken = await generateAccessToken()

    const { data } = await axios.get(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}`,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-Type': 'application/json',
        },
      },
    )

    const { reference_id: discountId } = data.purchase_units[0]
    const { custom_id: planId } = data.purchase_units[0].payments.captures[0]

    console.log(planId, discountId, orderId)
    const plan = await PricingPlans.query().findById(planId)

    const shop = await Shop.query().findById(shopId)
    const newTimePeriod = addDaysToGivenDate(
      shop.expirationDate,
      plan.timePeriodInMonths * 30,
    )

    await ShopRechargeLogs.query().insert({
      shopId,
      discountId,
      prevTimePeriod: shop.expirationDate,
      newTimePeriod,
      paypalOrderId: orderId,
      timePeriodInMonths: plan.timePeriodInMonths,
      cost: plan.cost,
    })

    await Shop.query().patch({
      expirationDate: newTimePeriod,
    })

    console.log('data inserted')

    console.log('ds_id', discountId)
    if (discountId.length > 1) {
      console.log('inside')
      await Discount.query()
        .patch({
          used: 1,
        })
        .where({ code: discountId })
    }

    // res.json(data)

    await sendEmail({
      emails: [email],
      subject: `Hello ${shop.name}.Welcome to Lowisy`,
      html: templateWelcomeToLowisyInvoice[req.lang]
        .replace('$restaurantName$', name)
        .replace('$restaurantName$', name),
    })
  },
)

router.post('/buy-shop-plan-fail/:orderId', async (req, res) => {
  res.json('Sorry,something went wrong')
})

router.post(
  '/onboarding-shop',
  userAuthMiddleware.protect(),
  async (req, res) => {
    console.log('onboarding-shop-update')
    await Shop.query()
      .patch({
        onBoarding: true,
      })
      .where({ id: req.authUser.id })
    res.send('ok')
  },
)

export default router
