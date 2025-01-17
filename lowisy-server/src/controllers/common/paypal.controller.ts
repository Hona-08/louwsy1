import { Request, Response } from 'express'
import { lang } from '../../lang'
import { paypalService } from '../../services/common'
import { validateVatNumber } from '../../utils/common/vatValidation'
import { BadRequestError } from '../../errors'

/**
 * @route POST
 * @access Public
 * @desc
 */
export async function createOrder(req: Request, res: Response) {
  const order = await paypalService.createOrder({
    product: req.body.product,
    authUser: req.authUser,
  })

  res.status(200).json({
    message: lang[req.lang].CREATED_SUCCESSFULLY,
    order,
  })
}

/**
 * @route POST
 * @access Public
 * @desc
 */
export async function createRestaurantOrder(req: Request, res: Response) {
  const order = await paypalService.createRestaurantOrder(req.body)

  res.status(200).json({
    message: lang[req.lang].CREATED_SUCCESSFULLY,
    order,
  })
}

/**
 * @route POST
 * @access Public
 * @desc
 */
export async function captureOrder(req: Request, res: Response) {
  const orderId = req.params.orderId

  const captureData = await paypalService.capturePayment(
    orderId as any as string,
  )

  res.status(200).json({
    message: lang[req.lang].CREATED_SUCCESSFULLY,
    captureData,
  })
}
