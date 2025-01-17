import { Request, Response } from 'express'
import { lang } from '../../lang'
import { shopLogisticService } from '../../services/shop'
import { formatTime } from '../../utils'

/**
 * @route GET /api/shops/payment-method
 * @access Private (By  admin of company)
 * @desc Gets all the payment method
 */

export async function getDeliveryOption(req: Request, res: Response) {
  const data = await shopLogisticService.getDeliveryOption(req.params.shopId)
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

/**
 * @route PUT /api/shops/payment-method/:paymentId
 * @access Private (By  admin of company)
 * @desc Update  the payment method by it's id
 */
export async function updateDeliveryOption(req: Request, res: Response) {
  const openingTime = formatTime(req.body.openingTime)
  const closingTime = formatTime(req.body.closingTime)

  await shopLogisticService.updateDeliveryOption({
    minimumOrder: req.body.minimumOrder,
    shippingCost: req.body.shippingCost,
    openingTime: openingTime,
    closingTime: closingTime,
    shippingType: req.body.shippingType,
    operatingSchedule: req.body.operatingSchedule,
    shopId: req.params.shopId,
  })

  res.status(200).json({
    message: lang[req.lang].UPDATED_SUCCESSFULLY,
  })
}
