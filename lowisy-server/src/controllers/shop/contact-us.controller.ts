import { Request, Response } from 'express'
import { json } from 'stream/consumers'
import { lang } from '../../lang'
import { shopContactUsService, shopProductService } from '../../services/shop'
import { GetContactUs } from '../../services/shop/contact-us.service'

/**
 * @route GET /api/shops/products
 * @access Private (By  admin of company)
 * @desc Gets all the products
 */

export async function getContactUs(req: Request, res: Response) {
  const data = await shopContactUsService.getContactUs(
    req.query as any as GetContactUs,
  )
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

/**
 * @route GET /api/shops/products/:productId
 * @access Private (By  admin of company)
 * @desc get a product by it's id
 */
export async function getContactUsById(req: Request, res: Response) {
  const data = await shopContactUsService.getContactUsById(
    req.params.contactUsId,
  )
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

export async function createContactUs(req: Request, res: Response) {
  const data = await shopContactUsService.createContactUs(req.body)
  res.status(200).json({
    message: 'Contact Us ' + lang[req.lang].CREATED_SUCCESSFULLY,
    data,
  })
}

export async function updateContactUs(req: Request, res: Response) {
  console.log(req.body)
  const { ...contactUs } = req.body
  await shopContactUsService.updateContactUs({
    contactUs,
    contactUsId: req.params.contactUsId,
  })
  console.log('contactUs', contactUs)

  res.status(200).json({
    message: 'Contact Us ' + lang[req.lang].UPDATED_SUCCESSFULLY,
  })
}

export async function deleteContactUs(req: Request, res: Response) {
  const data = await shopContactUsService.deleteContactUs(
    req.params.contactUsId,
  )
  res.status(200).json({
    message: lang[req.lang].DELETED_SUCCESSFULLY,
    data,
  })
}
