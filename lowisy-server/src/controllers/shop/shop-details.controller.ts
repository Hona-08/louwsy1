import { shopShopDetailsService } from '../../services/shop'
import { Request, Response } from 'express'
import { lang } from '../../lang'
import {
  GetProductsOfSingleShop,
  GetRestaurantByLatLng,
  GetShopProducts,
  GetShops,
} from '../../services/shop/shop-details.service'

/**
 * @route GET /api/shops/:shopId
 * @access Private (By  admin of company)
 * @desc gets the details of the shop by its id
 */

export async function getShopDetailsBySlug(req: Request, res: Response) {
  const data = await shopShopDetailsService.getShopDetailsBySlug(
    req.params.shopId,
  )
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

export async function getShopDetailsById(req: Request, res: Response) {
  const data = await shopShopDetailsService.getShopDetailsById(
    req.params.shopId,
  )
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

export async function getShopProducts(req: Request, res: Response) {
  req.query.shopId = req.params.shopId
  console.log({ query: req.query })
  const data = await shopShopDetailsService.getShopProducts(
    req.query as any as GetShopProducts,
  )
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data: data,
  })
}

export async function getShops(req: Request, res: Response) {
  const data = await shopShopDetailsService.getShops(
    req.query as any as GetShops,
  )
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

export async function getRestaurantByLatLng(req: Request, res: Response) {
  const data = await shopShopDetailsService.getRestaurantByLatLng(
    req.query as any as GetRestaurantByLatLng,
  )
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

export async function getShopProductByProductName(req: Request, res: Response) {
  const data = await shopShopDetailsService.getShopProductByProductName(
    req.params.shopId,
    req.params.productName,
  )
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

export async function getProductsOfSingleShop(req: Request, res: Response) {
  req.query.shopId = req.params.shopId
  const data = await shopShopDetailsService.getProductsOfSingleShop(
    req.query as any as GetProductsOfSingleShop,
  )
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}
