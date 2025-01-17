import { Request, Response } from 'express'
import { json } from 'stream/consumers'
import { lang } from '../../lang'
import { shopOrderCountService } from '../../services/shop'

/**
 * @route GET /api/shops/products
 * @access Private (By  admin of company)
 * @desc Gets all the products
 */

export async function getTotalOrders(req: Request, res: Response) {
  const data = await shopOrderCountService.getTotalOrders()

  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}
export async function getPendingOrders(req: Request, res: Response) {
  const data = await shopOrderCountService.getPendingOrders()
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}
export async function getTodayOrders(req: Request, res: Response) {
  const data = await shopOrderCountService.getTodayOrders()
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}
