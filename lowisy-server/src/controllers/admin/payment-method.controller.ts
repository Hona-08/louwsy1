import { Request, Response } from 'express'
import { lang } from '../../lang'
import { shopPaymentService } from '../../services/shop'

/**
 * @route GET /api/shops/payment-method
 * @access Private (By  admin of company)
 * @desc Gets all the payment method
 */

export async function getPaymentMethodsOfShop(req: Request, res: Response) {
  const data = await shopPaymentService.getPaymentMethodsOfShop(
    req.params.shopId,
  )
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

/**
 * @route GET /api/shops/payment-method
 * @access Private (By  admin of company)
 * @desc Gets all the payment method
 */

export async function getPaymentMethods(req: Request, res: Response) {
  const data = await shopPaymentService.getPaymentMethods()
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
export async function updatePaymentMethod(req: Request, res: Response) {
  await shopPaymentService.updatePaymentMethod({
    paymentMethodIds: req.body.paymentMethodIds,
    shopId: req.params.shopId,
  })

  res.status(200).json({
    message: lang[req.lang].UPDATED_SUCCESSFULLY,
  })
}
