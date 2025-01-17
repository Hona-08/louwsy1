import { Request, Response } from 'express'
import { lang } from '../../lang'
import { shopPolicyService } from '../../services/shop'

/**
 * @route GET /api/admin/categories
 * @access Private (By  admin of company)
 * @desc get all the categories
 */

export async function getPolicies(req: Request, res: Response) {
  const shopId = req.params.shopId

  const data = await shopPolicyService.getPolicies(shopId)
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}
/**
 * @route PATCH  /api/admin/categories/:categoryId
 * @access Private (By  admin of company)
 * @desc update category by its id
 */

export async function updatePolicy(req: Request, res: Response) {
  await shopPolicyService.updatePolicy({
    policyData: req.body,
    shopId: req.authUser.id,
  })

  res.status(200).json({
    message: lang[req.lang].UPDATED_SUCCESSFULLY,
  })
}
