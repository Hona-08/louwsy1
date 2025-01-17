import { Request, Response } from 'express'
import { lang } from '../../lang'
import { shopRatingService } from '../../services/shop'

export async function create(req: Request, res: Response) {
  const customerId = req.customerInfo.id
  const { rate, shopId } = req.body
  await shopRatingService.create({ rate, customerId, shopId })
  res.status(200).json({
    message: lang[req.lang].SUCCESS,
  })
}

export async function getRatingsoFSingleCustomer(req: Request, res: Response) {
  const customerId = req.customerInfo.id
  await shopRatingService.getRatingsoFSingleCustomer(customerId)
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
  })
}

export async function getRatings(req: Request, res: Response) {
  await shopRatingService.getRatings()
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
  })
}

export async function getAverageRatingOfAShop(req: Request, res: Response) {
  const data = await shopRatingService.getAverageRatingOfAShop(
    req.params.shopId,
  )
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}
