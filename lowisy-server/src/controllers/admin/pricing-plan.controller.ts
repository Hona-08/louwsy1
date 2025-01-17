import { Request, Response } from 'express'
import { lang } from '../../lang'
import { adminPricingService } from '../../services/admin'

/**
 * @route GET /api/admin/pricing-plan
 * @access Private (By  admin of company)
 * @desc get all the pricingPlan
 */

export async function getPricePlans(req: Request, res: Response) {
  const data = await adminPricingService.getPricePlans()
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

/**
 * @route GET /api/admin/pricing-plan/PricePlanId
 * @access Private (By  admin of company)
 * @desc get  the pricingPlan by it's id
 */
export async function getPricePlan(req: Request, res: Response) {
  const data = await adminPricingService.getPricePlan(req.params.pricePlanId)
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

/**
 * @route DELETE /api/admin/pricing-plan/:PricePlanId
 * @access Private (By  admin of company)
 * @desc Delete  the pricingPlan by it's id
 */
export async function deletePricePlan(req: Request, res: Response) {
  await adminPricingService.deletePricePlan(req.params.pricePlanId)
  res.status(200).json({
    message: lang[req.lang].DELETED_SUCCESSFULLY,
  })
}

/**
 * @route PUT /api/admin/pricing-plan/:PricePlanId
 * @access Private (By  admin of company)
 * @desc Update  the pricingPlan by it's id
 */
export async function updatePricePlan(req: Request, res: Response) {
  await adminPricingService.updatePricePlan({
    pricePlan: req.body,
    pricePlanId: req.params.pricePlanId,
  })
  res.status(200).json({
    message: lang[req.lang].UPDATED_SUCCESSFULLY,
  })
}

/**
 * @route POST /api/admin/pricing-plan
 * @access Private (By  admin of company)
 * @desc create a new pricing plan
 */

export async function createPricePlan(req: Request, res: Response) {
  await adminPricingService.createPricePlan(req.body)

  res.status(200).json({
    message: lang[req.lang].CREATED_SUCCESSFULLY,
  })
}
