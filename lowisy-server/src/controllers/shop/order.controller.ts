import { Request, Response } from 'express'
import { json } from 'stream/consumers'
import { lang } from '../../lang'
import { shopOrderService, shopProductService } from '../../services/shop'
import { GetOrders } from '../../services/shop/order.service'
import { GetProducts } from '../../services/shop/product.service'

/**
 * @route GET /api/shops/products
 * @access Private (By  admin of company)
 * @desc Gets all the products
 */

export async function getOrders(req: Request, res: Response) {
  const shopId = req.authUser.id
  const data = await shopOrderService.getOrders(
    req.query as any as GetOrders,
    shopId,
  )
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

/**
 * @route GET /api/shops/products
 * @access Private (By  admin of company)
 * @desc Gets all the products
 */

export async function findMyOrder(req: Request, res: Response) {
  const data = await shopOrderService.findMyOrder(req.query as any)
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

/**
 * @route GET /api/shops/products/:productId
 * @access Private (By  admin of company)
 * @desc get a product by it's id
 */
export async function getOrder(req: Request, res: Response) {
  const data = await shopOrderService.getOrder(req.params.orderId)
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

/**
 * @route DELETE /api/shops/products/:productId
 * @access Private (By  admin of company)
 * @desc Deletes  the product by it's id
 */
export async function deleteOrder(req: Request, res: Response) {
  await shopOrderService.deleteOrder(req.params.orderId)
  res.status(200).json({
    message: lang[req.lang].DELETED_SUCCESSFULLY,
  })
}

/**
 * @route PUT /api/shops/products/:productId
 * @access Private (By  admin of company)
 * @desc Updates the product by it's id
 */
export async function updateOrder(req: Request, res: Response) {
  await shopOrderService.updateOrder({
    status: req.body.status,
    orderId: req.params.orderId,
    lang: req.lang,
  })

  res.status(200).json({
    message: lang[req.lang].UPDATED_SUCCESSFULLY,
  })
}
/**
 * @route POST /api/shops/products
 * @access Private (By  admin of company)
 * @desc Creates a new product
 */
export async function createOrder(req: Request, res: Response) {
  const customerId = req?.customerInfo?.id
  const {
    cartList,
    totalCost,
    paymentMethod,
    klarnaReferenceId,
    paypalOrderId,
    discountId,
    address,
  } = req.body

  console.log({ body: req.body, cart: JSON.stringify(req.body.cartList) })

  await shopOrderService.createOrder({
    totalCost,
    paymentMethod,
    cartList,
    customerId,
    klarnaReferenceId,
    paypalOrderId,
    discountId,
    address,
    lang: req.lang,
  })

  console.log('service called')

  res.status(200).json({
    message: lang[req.lang].CREATED_SUCCESSFULLY,
  })
}

export async function getOrderStatus(req: Request, res: Response) {
  const data = await shopOrderService.getOrderStatus()

  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

export async function saveShippingAddress(req: Request, res: Response) {
  const customerId = req?.customerInfo?.id
  req.body.address.customerId = customerId
  console.log({ customerId, address: req.body.address })
  await shopOrderService.saveShippingAddress(req.body.address)

  res.status(200).json({
    message: lang[req.lang].CREATED_SUCCESSFULLY,
  })
}
