import { Request, Response } from 'express'
import { lang } from '../../lang'
import { shopDeliveryOptions } from '../../services/shop'

export async function getDeliveries(req: Request, res: Response) {
  const data = await shopDeliveryOptions.getDeliveries()
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}
