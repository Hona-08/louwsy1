import { Request, Response } from 'express'
import { lang } from '../../lang'
import { customerOrderService } from '../../services/customer'

export async function getCustomerOrders(req: Request, res: Response) {
  const customerId = req.customerInfo.id
  const data = await customerOrderService.getCustomerOrders(
    customerId,
    req.query,
  )

  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

export async function getOrderIds(req: Request, res: Response) {
  const data = await customerOrderService.getOrderIds()

  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

export async function getOrder(req: Request, res: Response) {
  const data = await customerOrderService.getOrder(req.params.orderId)
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}
