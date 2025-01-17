import { Request, Response } from 'express'
import { lang } from '../../lang'
import { adminShopService } from '../../services/admin'
import { GetAdminShops } from '../../services/admin/shops.services'
import {
  GetShops,
  GetProductsOfSingleShop,
} from '../../services/shop/shop-details.service'

export async function getShops(req: Request, res: Response) {
  const data = await adminShopService.getShops(
    req.query as any as GetAdminShops,
  )
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

export async function getShopDetails(req: Request, res: Response) {
  const data = await adminShopService.getShopDetails(req.params.shopId)
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

export async function getProductsOfSingleShop(req: Request, res: Response) {
  req.query.shopId = req.params.shopId
  const data = await adminShopService.getProductsOfSingleShop(
    req.query as any as GetProductsOfSingleShop,
  )
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

export async function updateShopStatus(req: Request, res: Response) {
  const data = await adminShopService.updateShopStatus(req.body.shopIds)
  res.status(200).json({
    message: lang[req.lang].UPDATED_SUCCESSFULLY,
    //data,
  })
}
