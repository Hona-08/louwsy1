import { Request, Response } from 'express'
import { lang } from '../../lang'
import { shopCustomerService } from '../../services/shop'
import {
  GetCustomerOrders,
  GetCustomers,
} from '../../services/shop/customer.service'

/**
 * @route GET /api/shops/customers
 * @access Private (By  admin of company)
 * @desc Gets all the products
 */

export async function getCustomers(req: Request, res: Response) {
  const shopId = req.authUser.id
  req.query.shopId = shopId
  console.log({ req: req.query })
  const data = await shopCustomerService.getCustomers(
    req.query as any as GetCustomers,
  )
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

/**
 * @route GET /api/shops/customers
 * @access Private (By  admin of company)
 * @desc Gets all the products
 */

export async function getCustomerOrders(req: Request, res: Response) {
  req.query.customerId = req.params.customerId

  const data = await shopCustomerService.getCustomerOrders(
    req.query as any as GetCustomerOrders,
  )
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

/**
 * @route GET /api/shops/customers/:id
 * @access Private (By  admin of company)
 * @desc Gets all the products
 */

export async function getCustomer(req: Request, res: Response) {
  const data = await shopCustomerService.getCustomer(
    req.params.customerId as any,
  )
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}
