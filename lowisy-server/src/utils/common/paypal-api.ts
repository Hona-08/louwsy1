import axios from 'axios'

const { CLIENT_ID, APP_SECRET } = process.env
const base = 'https://api-m.sandbox.paypal.com'

export async function createOrder(data: any) {
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

export async function capturePayment(orderId: string) {
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

export async function generateAccessToken() {
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
