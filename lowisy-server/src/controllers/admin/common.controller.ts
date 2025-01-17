import { Request, Response } from 'express'
import { lang } from '../../lang'
import { commonService } from '../../services/admin'

export async function getCountries(req: Request, res: Response) {
  const data = await commonService.getCountries()
  console.log({ countries: data })
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

export async function verifyRecaptcha(req: Request, res: Response) {
  const data = await commonService.verifyRecaptcha(req.body.token)
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

export async function getAllSlugs(req: Request, res: Response) {
  const data = await commonService.getAllSlugs()
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}
