import axios from 'axios'
import fetch from 'node-fetch'
import { privateDecrypt } from 'crypto'
import { json } from 'stream/consumers'
import { Discount } from '../../models/discount.model'
import { PricingPlans } from '../../models'
import { validateVatNumber } from '../../utils/common/vatValidation'
import { BadRequestError } from '../../errors'

// const { CLIENT_ID, APP_SECRET } = process.env;
const CLIENT_ID =
  'Adz6vrIYz4jQyt9roSZjB3mEPHFIYcozv7vDPDMBRQ_aITPUH5Z-tl4wKQONGsr12NowEeFTRvOIEom1'
const APP_SECRET =
  'ELNPmZ4J_ouO71gnfwEX2SxePJFufU0JuIKYHhE02trdcIHD0F4y6C6GAG22sldV48wpOy0uwEWkW2PL'
const base = 'https://api-m.sandbox.paypal.com'

export async function generateAccessToken() {
  const auth = Buffer.from(CLIENT_ID + ':' + APP_SECRET).toString('base64')
  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: 'post',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${auth}`,
    },
  })

  const jsonData = await handleResponseToken(response)
  return jsonData.access_token
}

export async function handleResponseToken(response: any) {
  if (response.status === 200 || response.status === 201) {
    return await response.json()
  }
  const errorMessage = await response.text()

  throw new Error(errorMessage)
}

export async function handleResponse(response: any) {
  return await response
}

export async function createOrder({ product, authUser }: any) {
  const isValid = await validateVatNumber(authUser.taxRegistration)

  if (!isValid) {
    throw new BadRequestError('INVALID_VAT_NUMBER')
  }

  const accessToken = await generateAccessToken()
  const url = `${base}/v2/checkout/orders`

  const isLicensedData =
    product?.plan_id?.length > 1 && product.plan_id !== 'undefined'

  console.log({ isLicensedData })
  let plan
  let discountPercentage = 0
  if (isLicensedData) {
    plan = await PricingPlans.query().where({ id: product.plan_id }).first()

    const discount = await Discount.query().findOne({
      restaurantEmail: authUser.email,
      code: product.discount_id ?? '',
      usedBy: 'restaurant',
      limit: 1,
      used: 0,
    })

    if (discount) {
      discountPercentage = discount.discountPercentage / 100
    }
  }

  const bodyData = isLicensedData
    ? {
        intent: 'CAPTURE',
        purchase_units: [
          {
            reference_id: product.discount_id,
            custom_id: product.plan_id,
            amount: {
              currency_code: 'EUR',
              value:
                plan.cost * plan.timePeriodInMonths -
                discountPercentage * plan.cost * plan.timePeriodInMonths,
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value:
                    plan.cost * plan.timePeriodInMonths -
                    discountPercentage * plan.cost * plan.timePeriodInMonths,
                },
              },
            },
          },
        ],
        // "experience_context": {
        //     "payment_method_preference": "IMMEDIATE_PAYMENT_REQUIRED",
        //     "payment_method_selected": "PAYPAL",
        //     "brand_name": "Lowisy",
        //     "locale": "en-US",
        //     "landing_page": "LOGIN",
        //     "shipping_preference": "SET_PROVIDED_ADDRESS",
        //     "user_action": "PAY_NOW",
        //     // "return_url": "http://localhost:3001/api/paypal/buy-shop-plan-success/?order_id={order.id}",
        //     // "cancel_url": "http://localhost:3001/api/paypal/buy-shop-plan-fail"
        // }
      }
    : {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: 20,
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: 20,
                },
              },
            },
          },
        ],
      }

  const stringData = JSON.stringify(bodyData)

  console.log({ stringData })
  const { data } = await axios.post(url, stringData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return handleResponse(data)
}

export async function createRestaurantOrder({ orderPrice, discountId }: any) {
  const accessToken = await generateAccessToken()
  const url = `${base}/v2/checkout/orders`

  let discountAmount = 0
  if (discountId?.length > 1 && discountId !== 'undefined') {
    const discount = await Discount.query().patchAndFetchById(discountId, {
      used: 1,
    })
    console.log({ discount })
    if (discount) {
      discountAmount = discount.amount
    }
  }

  const bodyData = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'EUR',
          value: 1,
          breakdown: {
            item_total: {
              currency_code: 'EUR',
              value: 1,
            },
          },
        },
      },
    ],
  }

  const stringData = JSON.stringify(bodyData)

  console.log({ stringData })
  const { data } = await axios.post(url, stringData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return handleResponse(data)
}

export async function capturePayment(orderId: string) {
  const accessToken = await generateAccessToken()
  const url = `${base}/v2/checkout/orders/${orderId}/capture`
  const { data } = await axios.post(
    url,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return handleResponse(data)
}
