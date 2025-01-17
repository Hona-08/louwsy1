import { Request, Response } from 'express'
import { lang } from '../../lang'
import { customerService } from '../../services/customer'

export async function getCustomer(req: Request, res: Response) {
  const customerId = req.customerInfo.id
  const data = await customerService.getCustomer(customerId)

  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

export async function updateCustomer(req: Request, res: Response) {
  const customerId = req.customerInfo.id
  customerService.updateCustomer(customerId, req.body)

  res.status(200).json({
    message: lang[req.lang].UPDATED_SUCCESSFULLY,
  })
}

export async function customerAddresses(req: Request, res: Response) {
  const customerId = '8e3247f3-994b-4328-a377-a69ba0340804'

  const data = await customerService.customerAddresses(customerId)

  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}
