import axios from 'axios'
import { Shop } from '../../models'
import { Country } from '../../models/shop/country.model'

export async function getCountries() {
  const countries = await Country.query()
  return countries
}

export async function verifyRecaptcha(token: string) {
  const res = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPATCHA_SECRET_KEY}&response=${token}`,
  )

  return res.data
}

export async function getAllSlugs() {
  const slugs = await (await Shop.query()).map((shop) => shop.slug)
  return slugs
}

export async function paypalPayment() {
  //const { CLIENT_ID, APP_SECRET } = process.env;
  const CLIENT_ID =
    'Adz6vrIYz4jQyt9roSZjB3mEPHFIYcozv7vDPDMBRQ_aITPUH5Z-tl4wKQONGsr12NowEeFTRvOIEom1'
  const APP_SECRET = 'lowisywebsapp'
  const base = 'https://api-m.sandbox.paypal.com'

  async function createOrder(data: any) {
    const accessToken = await generateAccessToken()
    const url = `${base}/v2/checkout/orders`
    const response = await axios.post(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: data.product.cost,
            },
          },
        ],
      }),
    })

    return handleResponse(response)
  }

  async function capturePayment(orderId: string) {
    const accessToken = await generateAccessToken()
    const url = `${base}/v2/checkout/orders/${orderId}/capture`
    const response = await axios(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return handleResponse(response)
  }

  async function generateAccessToken() {
    const auth = Buffer.from(CLIENT_ID + ':' + APP_SECRET).toString('base64')
    const response = await axios.post(`${base}/v1/oauth2/token`, {
      body: 'grant_type=client_credentials',
      headers: {
        Authorization: `Basic ${auth}`,
      },
    })

    const jsonData = await handleResponse(response)
    return jsonData.access_token
  }

  async function handleResponse(response: any) {
    if (response.status === 200 || response.status === 201) {
      return response.json()
    }

    const errorMessage = await response.text()
    throw new Error(errorMessage)
  }
}
