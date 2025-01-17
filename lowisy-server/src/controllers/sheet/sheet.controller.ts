import { Request, Response } from 'express'
import { lang } from '../../lang'
import { sheetService } from '../../services/sheets'
import { ReqLang } from '../../enums/lang'

export async function saveRecommendedRestaurant(req: Request, res: Response) {
  const data = await sheetService.saveRecommendedRestaurant(
    req.body,
    req.lang as ReqLang,
  )
  res.status(200).json({
    message: lang[req.lang].YOUR_RECOMMEND_SENT,
    data,
  })
}

export async function saveContactUs(req: Request, res: Response) {
  const data = await sheetService.saveContactUs(req.body)
  res.status(200).json({
    message: lang[req.lang].CONTACT_SAVE,
    data,
  })
}
