import axios from 'axios'
import { raw, Router } from 'express'
import { parse } from 'path'
import { templateWelcomeToLowisyInvoice } from '../../constants/email-templates'
import { shopShopDetailsController } from '../../controllers/shop'
import { userAuthMiddleware } from '../../middlewares'
import { PricingPlans, Shop, ShopRechargeLogs } from '../../models'
import { Discount } from '../../models/discount.model'
import { addDaysToGivenDate, sendEmail } from '../../utils'
import { validateVatNumber } from '../../utils/common/vatValidation'
import { lang } from '../../lang'
import { BadRequestError } from '../../errors'

// import { shopProductValidator } from '../../validators'

const router = Router()

router.get('/lat-lng', shopShopDetailsController.getRestaurantByLatLng)

router.get('/:shopId/details', shopShopDetailsController.getShopDetailsBySlug)

router.get('/:shopId', shopShopDetailsController.getShopDetailsById)

router.get(
  '/',
  userAuthMiddleware.protect(),
  shopShopDetailsController.getShops,
)

router.get(
  '/:shopId/products',
  //userAuthMiddleware.protect(),
  shopShopDetailsController.getShopProducts,
)

router.get(
  '/:shopId/list-products',
  userAuthMiddleware.protect(),
  shopShopDetailsController.getProductsOfSingleShop,
)
router.get(
  '/:shopId/product/:productName',
  userAuthMiddleware.protect(),
  shopShopDetailsController.getShopProductByProductName,
)

router.post('/buy-plan', userAuthMiddleware.protect(), async (req, res) => {
  const plan = await PricingPlans.query().where({ id: req.body.planId }).first()
  let discountPercentage = 0

  const discount = await Discount.query().findOne({
    restaurantEmail: req.authUser.email,
    code: req?.body?.code ?? '',
    usedBy: 'restaurant',
    limit: 1,
    used: 0,
  })

  console.log({ shop: req.authUser })

  if (!req.authUser.isTaxRegister) {
    throw new BadRequestError('INVALID_VAT_NUMBER')
  }

  if (discount) {
    discountPercentage = discount.discountPercentage / 100
  }
  //PK75711_7a21c28e2f75:0Gq7Ej7LxYedMBEd  --> bibeshdhital
  const token = `PK75711_7a21c28e2f75:0Gq7Ej7LxYedMBEd`

  const encodedToken = Buffer.from(token).toString('base64')
  const lowisyData = {
    discountId: discount?.id,
    shopId: req.authUser.id,
    planId: plan.id,
  }

  console.log({ lowisyData })

  const { data } = await axios.post(
    'https://api.playground.klarna.com/checkout/v3/orders',
    {
      discountCodeId: discount?.id,
      purchase_country: 'AT',
      purchase_currency: 'EUR',
      locale: 'en',
      order_amount:
        plan.cost * plan.timePeriodInMonths * 100 -
        discountPercentage * plan.cost * plan.timePeriodInMonths * 100,
      order_tax_amount: 0,
      order_lines: [
        {
          name: `${plan.timePeriodInMonths} Months Plans`,
          quantity: 1,
          unit_price: plan.cost * plan.timePeriodInMonths * 100,
          tax_rate: 0,
          total_amount:
            plan.cost * plan.timePeriodInMonths * 100 -
            discountPercentage * plan.cost * plan.timePeriodInMonths * 100,
          total_discount_amount:
            discountPercentage * plan.cost * plan.timePeriodInMonths * 100,
          total_tax_amount: 0,
        },
      ],
      merchant_urls: {
        terms: 'https://www.example.com/terms.html',
        checkout:
          'https://www.example.com/checkout.html?order_id={checkout.order.id}',
        confirmation:
          'http://localhost:8081/successful-payment?order_id={checkout.order.id}',
        push: 'https://www.example.com/api/push?order_id={checkout.order.id}}',
      },
      attachment: {
        content_type: 'application/vnd.klarna.internal.emd-v2+json',
        body: JSON.stringify(lowisyData),
      },
    },
    {
      headers: { Authorization: 'Basic ' + encodedToken },
    },
  )

  res.json(data)
})

router.post('/buy-plan/:orderId', async (req, res) => {
  const orderId = req.params.orderId

  const alreadyRecharged = await ShopRechargeLogs.query().findOne({
    klarnaReferenceId: orderId,
  })
  if (alreadyRecharged) return

  const token = `PK75711_7a21c28e2f75:0Gq7Ej7LxYedMBEd`
  const encodedToken = Buffer.from(token).toString('base64')

  const { data } = await axios.get(
    `https://api.playground.klarna.com/checkout/v3/orders/${orderId}`,
    {
      headers: { Authorization: 'Basic ' + encodedToken },
    },
  )

  const { discountId, shopId, planId } = JSON.parse(data.attachment.body)

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
    klarnaReferenceId: orderId,
    timePeriodInMonths: plan.timePeriodInMonths,
    cost: plan.cost,
  })

  await Shop.query().patch({
    expirationDate: newTimePeriod,
  })

  if (discountId) {
    await Discount.query()
      .patch({
        used: 1,
      })
      .where({ id: discountId })
  }

  // res.status(200).json({
  //   message: lang[req.lang].SUCCESS,
  // })

  res.json(data)

  await sendEmail({
    emails: [shop.email],
    subject: `Hello ${shop.name}.Welcome to Lowisy`,
    html: templateWelcomeToLowisyInvoice[req.lang]
      .replace('$restaurantName$', shop.name)
      .replace('$restaurantName$', shop.name),
  })
})

router.post('/buy-plan-success', async (req, res) => {
  const orderId = req.query.order_id as string
  console.log({ buyPlanSUc: orderId })
  const alreadyRecharged = await ShopRechargeLogs.query().findOne({
    klarnaReferenceId: orderId,
  })
  if (alreadyRecharged) return

  const token = `PK75711_7a21c28e2f75:0Gq7Ej7LxYedMBEd`
  const encodedToken = Buffer.from(token).toString('base64')

  const { data } = await axios.get(
    `https://api.playground.klarna.com/checkout/v3/orders/${orderId}`,
    {
      headers: { Authorization: 'Basic ' + encodedToken },
    },
  )

  const { discountId, shopId, planId } = JSON.parse(data.attachment.body)

  console.log('buy plan success', { discountId, shopId, planId })
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
    klarnaReferenceId: orderId,
    timePeriodInMonths: plan.timePeriodInMonths,
    cost: plan.cost,
  })

  await Shop.query().patch({
    expirationDate: newTimePeriod,
  })

  if (discountId) {
    await Discount.query()
      .patch({
        used: 1,
      })
      .where({ id: discountId })
  }

  // res.status(200).json({
  //   message: lang[req.lang].SUCCESS,
  // })

  res.json(data)

  await sendEmail({
    emails: [shop.email],
    subject: `Hello ${shop.name}.Welcome to Lowisy`,
    html: templateWelcomeToLowisyInvoice[req.lang]
      .replace('$restaurantName$', shop.name)
      .replace('$restaurantName$', shop.name),
  })
})

router.post(
  '/onboarding-ui',
  userAuthMiddleware.protect(),
  async (req, res) => {
    //PK75711_7a21c28e2f75:0Gq7Ej7LxYedMBEd-->Bibesh
    const token = `PK75711_7a21c28e2f75:0Gq7Ej7LxYedMBEd`
    const encodedToken = Buffer.from(token).toString('base64')

    if (!req?.authUser?.isTaxRegister) {
      throw new BadRequestError('INVALID_VAT_NUMBER')
    }

    const { data } = await axios.post(
      'https://api.playground.klarna.com/checkout/v3/orders',
      {
        purchase_country: 'AT',
        purchase_currency: 'EUR',
        locale: 'en',
        order_amount: 2000,
        order_tax_amount: 0,
        order_lines: [
          {
            name: 'On Boarding Service',
            quantity: 1,
            unit_price: 2000,
            tax_rate: 0,
            total_amount: 2000,
            total_discount_amount: 0,
            total_tax_amount: 0,
          },
        ],
        merchant_urls: {
          terms: 'https://www.example.com/terms.html',
          checkout:
            'https://www.example.com/checkout.html?order_id={checkout.order.id}',
          confirmation: 'http://localhost:8081/successful-payment-onboarding',
          push: 'https://www.example.com/api/push?order_id={checkout.order.id}',
        },
      },
      {
        headers: { Authorization: 'Basic ' + encodedToken },
      },
    )

    res.json(data)
  },
)

router.post('/onboarding', userAuthMiddleware.protect(), async (req, res) => {
  await Shop.query()
    .patch({
      onBoarding: true,
    })
    .where({ id: req.authUser.id })
  res.send('ok')
})

export default router
