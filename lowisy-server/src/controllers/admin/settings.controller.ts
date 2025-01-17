import { Request, Response } from 'express'
import { lang } from '../../lang'
import { shopSettingService } from '../../services/shop'

/**
 * @route GET /api/admin/pricing-plan/PricePlanId
 * @access Private (By  admin of company)
 * @desc get  the pricingPlan by it's id
 */
export async function getShop(req: Request, res: Response) {
  const data = await shopSettingService.getShop(req.params.shopId)
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

/**
 * @route PUT /api/admin/pricing-plan/PricePlanId
 * @access Private (By  admin of company)
 * @desc Update  the pricingPlan by it's id
 */
export async function updateShop(req: Request, res: Response) {
  const { coverImage, logo, ...shop } = req.body
  await shopSettingService.updateShop({
    shop,
    shopId: req.params.shopId,
    files: req?.files,
  })
  res.status(200).json({
    message: lang[req.lang].UPDATED_SUCCESSFULLY,
  })
}
