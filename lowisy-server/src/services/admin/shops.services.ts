import { OrderByDirection, raw } from 'objection'
import { Product, Shop } from '../../models'
import { GetProductsOfSingleShop } from '../shop/shop-details.service'

export type GetAdminShops = {
  pageNumber: number
  pageSize: number
  searchQuery: string
  sortBy: string
  order: string
  filterStatus: string
}

export async function getShops({
  pageNumber,
  pageSize,
  searchQuery,
  sortBy,
  order,
  filterStatus,
}: GetAdminShops) {
  const query = Shop.query()
    .where((builder) => {
      if (searchQuery?.length > 0) {
        builder.where('name', 'like', `%${searchQuery}%`)
      }
      if (filterStatus && filterStatus !== 'All') {
        builder.where('on_boarding', 1)
      }
    })
    .page(pageNumber, pageSize)

  // if (sortBy?.length > 0) {
  //   const [column, order] = sortBy.split('|')
  //   query.orderBy(column, order as OrderByDirection)
  // }

  const shops = await query

  return shops
}

export async function getShopDetails(id: string) {
  const shop = await Shop.query().findById(id)
  return shop
}

export async function getProductsOfSingleShop({
  pageNumber,
  pageSize,
  searchQuery,
  sortBy,
  order,
  shopId,
}: GetProductsOfSingleShop) {
  const query = Product.query()
    .withGraphFetched('productImages')
    .modifyGraph('productImages', (builder) => {
      builder.select(['name as images'])
    })
    .where((builder) => {
      if (searchQuery?.length > 0) {
        builder
          .where('name', 'like', `%${searchQuery}%`)
          .orWhere('price', 'like', `%${searchQuery}%`)
      }
      // if (sortBy?.length > 0) {
      //   builder.orderBy(sortBy, order as OrderByDirection)
      // }
    })
    .page(pageNumber, pageSize)
    .where({ shopId })

  if (sortBy?.length > 0) {
    query.orderBy(sortBy, order as OrderByDirection)
  }

  const products = await query
  return products
}

export async function updateShopStatus(shopIds: string[]) {
  await Shop.query()
    .patch({
      isActive: raw(`NOT is_active`),
    })
    .whereIn('id', shopIds)
}
