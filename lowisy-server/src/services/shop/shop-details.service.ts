import { OrderByDirection } from 'objection'
import { TABLES } from '../../constants'
import { shopSettingController } from '../../controllers/shop'
import { Rating, Shop } from '../../models'
import { Product } from '../../models'
import estimateDeliveryTime from '../../utils/common/estimated-delivery-time'

export async function getShopDetailsBySlug(id: string) {
  const shop = await Shop.query().where({ slug: id }).first()
  const ratings = await Rating.query()
    .avg('rate as rate')
    .count('id as totalCount')
    .where({ shopId: shop.id })
    .first()
  shop.rating = {
    rate: ratings.rate,
    totalCount: ratings.totalCount,
  }
  return shop
}

export async function getShopDetailsById(id: string) {
  const shop = await Shop.query().where({ id }).first()
  return shop
}

// for lowisy-shop

export type GetShopProducts = {
  sortBy: string
  searchQuery: string
  shopId: string
  filterValues: any
}
export async function getShopProducts({
  sortBy,
  searchQuery,
  shopId,
  filterValues,
}: GetShopProducts) {
  const parsedValues = JSON.parse(filterValues)
  console.log({ parsedValues })
  console.log({ shopId })
  const { id: restaurantId } = await Shop.query()
    .where({ slug: shopId })
    .first()
  if (!restaurantId) return
  const query = Product.query()
    .withGraphJoined('productImages')
    .modifyGraph('productImages', (builder) => {
      builder.select(['name'])
    })
    .where((builder) => {
      if (searchQuery?.length > 0) {
        builder.where('products.name', 'like', `%${searchQuery}%`)
        //.orWhere('price', 'like', `%${searchQuery}%`)
      }
    })
    .where((builder) => {
      if (parsedValues?.lowPrice && parsedValues?.highPrice) {
        builder.whereBetween('products.price', [
          parsedValues.lowPrice,
          parsedValues.highPrice,
        ])
      }
      if (parsedValues?.category) {
        console.log(parsedValues.category)
        builder.where('products.categoriesId', parsedValues?.category)
      }
    })
    .where('shop_id', restaurantId)

  if (sortBy?.length > 0) {
    const [column, order] = sortBy.split('|')
    query.orderBy(column, order as OrderByDirection)
  }

  const product = await query
  return product
}

export type GetShops = {
  pageNumber: number
  pageSize: number
  searchQuery: string
  sortBy: string
  order: string
}

export async function getShops({
  pageNumber,
  pageSize,
  searchQuery,
  sortBy,
  order,
}: GetShops) {
  const query = Shop.query()
    .where((builder) => {
      if (searchQuery?.length > 0) {
        builder.where('name', 'like', `%${searchQuery}%`)
        //.orWhere('price', 'like', `%${searchQuery}%`)
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

export type GetRestaurantByLatLng = {
  sortBy: string
  searchQuery: string
  lat: number
  lng: number
  radiusInKm: number
  filterValues: any
}

// export async function getRestaurantByLatLng({
//   lat,
//   lng,
//   radiusInKm,
//   sortBy,
//   searchQuery,
//   filterValues,
// }: GetRestaurantByLatLng) {
//   const parsedValues = JSON.parse(filterValues)
//   console.log(parsedValues)
//   if (lat & lng) {
//     const distance =
//       ' ,(((acos(sin((' +
//       lat +
//       '*pi()/180)) * sin((`s`.`lat`*pi()/180))+cos((' +
//       lat +
//       '*pi()/180)) * cos((`s`.`lat`*pi()/180)) * cos(((' +
//       lng +
//       '-`s`.`lng`)*pi()/180))))*180/pi())*60*1.1515*1.609344) as distance '

//     const having = ` HAVING (distance <= ${radiusInKm} ) `
//     const [column, order] = sortBy.split('|')
//     const orderBy = `${column} ${order}`

//     let query = ''
//     if (parsedValues.category === undefined) {
//       query =
//         'SELECT s.*' +
//         distance +
//         ` FROM shops s where name LIKE '%${searchQuery}%' and () and shipping_type = '${parsedValues.shippingType}' ${having} ORDER BY ${orderBy}`
//     } else if (parsedValues.category != 'all') {
//       query =
//         'SELECT s.*' +
//         distance +
//         ` FROM shops s where name LIKE '%${searchQuery}%' and shipping_type = '${parsedValues.shippingType}' and category_id='${parsedValues.category}' ${having} ORDER BY ${orderBy}`
//     } else {
//       query =
//         'SELECT s.*' +
//         distance +
//         ` FROM shops s where name LIKE '%${searchQuery}%' and shipping_type = '${parsedValues.shippingType}' ${having} ORDER BY ${orderBy}`
//     }

//     const knex = Shop.knex()
//     const data = await knex.raw(query)
//     // console.log(data[0])

//     return data[0]
//   } else {
//     const query = Shop.query()
//       .where(builder => {
//         if (parsedValues.isOpen) {
//           builder.where('opening_time', '<', new Date().toLocaleTimeString([], { hourCycle: 'h23' }).split(' ')[0])
//           builder.andWhere('closing_time', '>', new Date().toLocaleTimeString([], { hourCycle: 'h23' }).split(' ')[0])
//         }
//         if (parsedValues.isFreeDelivery) {
//           builder.where('shippingCost', '=', 0)
//         }
//         if (parsedValues.minimumOrder) {
//           builder.whereBetween('minimumOrder', [0, parsedValues.minimumOrder])
//         }
//         if (parsedValues.shippingType) {
//           builder.where('shippingType', parsedValues.shippingType)
//         }
//         if (parsedValues.category !== 'all' && parsedValues.category) {
//           builder.where('category_id', parsedValues.category)
//         }
//       })

//     if (sortBy.length > 0) {
//       const [column, order] = sortBy.split('|')
//       query.orderBy(column, order as OrderByDirection)
//     }

//     const restaurants = await query;
//     return restaurants
//   }
// }

export async function getRestaurantByLatLng({
  lat,
  lng,
  radiusInKm,
  sortBy,
  searchQuery,
  filterValues,
}: GetRestaurantByLatLng) {
  const parsedValues = JSON.parse(filterValues)
  console.log(parsedValues)
  const distance =
    ' ,(((acos(sin((' +
    lat +
    '*pi()/180)) * sin((`s`.`lat`*pi()/180))+cos((' +
    lat +
    '*pi()/180)) * cos((`s`.`lat`*pi()/180)) * cos(((' +
    lng +
    '-`s`.`lng`)*pi()/180))))*180/pi())*60*1.1515*1.609344) as distance '

  const having = ` HAVING (distance <= ${radiusInKm} ) `
  console.log({ distance, having })
  const [column, order] = sortBy.split('|')
  const orderBy = `${column} ${order}`

  //let query = `SELECT s.*,avg(ratings.rate) as rate`
  let query = `SELECT s.*,avg(ratings.rate) as rate`

  if (lat & lng) {
    query += `,ROUND(6371 * ACOS(
      COS(RADIANS(${lat})) * COS(RADIANS(lat)) *
      COS(RADIANS(lng) - RADIANS(${lng})) +
      SIN(RADIANS(${lat})) * SIN(RADIANS(lat))
    ), 2) AS distance_in_km,
  ROUND((6371 * ACOS(
      COS(RADIANS(${lat})) * COS(RADIANS(lat)) *
      COS(RADIANS(lng) - RADIANS(${lng})) +
      SIN(RADIANS(${lat})) * SIN(RADIANS(lat))
    )) / 40 * 60, 0) AS delivery_time `
  }

  if (lat & lng) {
    query += ` ${distance} `
  }

  query += ` FROM shops s LEFT JOIN ratings ON s.id=ratings.shop_id where name LIKE '%${searchQuery}%' `

  if (parsedValues?.minimumOrder) {
    query += ` and minimum_order <= ${parsedValues.minimumOrder} `
  }

  if (parsedValues?.isFreeDelivery) {
    query += ` and shipping_cost <= 0`
  }

  if (parsedValues?.category) {
    query += ` and category_id = '${parsedValues.category}'`
  }

  if (parsedValues?.isOpen) {
    query += ` and opening_time <= '${
      new Date().toLocaleTimeString([], { hourCycle: 'h23' }).split(' ')[0]
    }'`
    query += ` and closing_time >= '${
      new Date().toLocaleTimeString([], { hourCycle: 'h23' }).split(' ')[0]
    }'`
  }

  query += ` and shipping_type = '${
    parsedValues.shippingType
  }' or expiration_date >= '${
    new Date().toISOString().split('T')[0]
  }' and is_active=1`

  query += ` GROUP BY s.id`

  if (lat & lng) {
    query += ` ${having}`
  }

  if (column === 'delivery_time' && lat && lng) {
    query += ` ORDER BY ${orderBy} `
  }

  if (column === 'reviews') {
    query += ` ORDER BY rate ${order} `
  }

  console.log({ orderBy, length: orderBy.length })

  //if there is no lat lng
  if (orderBy.length > 0) {
    console.log({ column, val: column == 'reviews' })
    if (column == 'best_match') {
    } else if (column == 'reviews') {
    } else if (column == 'most_popular') {
    } else if (column == 'delivery_time') {
    } else if (column == 'distance') {
      if (!(lat & lng)) {
        query += ` `
      } else {
        query += ` ORDER BY ${orderBy} `
      }
    } else {
      query += ` ORDER BY ${orderBy} `
    }
  }

  console.log({ query })

  const knex = Shop.knex()
  const data = await knex.raw(query)

  console.log({ data: data[0] })
  return data[0]
}

export async function getShopProductByProductName(
  id: string,
  productName: string,
) {
  const product = await Product.query()
    .withGraphJoined('productImages')
    .modifyGraph('productImages', (builder) => {
      builder.select(['name as images'])
    })
    .where(`${TABLES.PRODUCT}.shop_id`, id)
    .andWhere(`${TABLES.PRODUCT}.name`, productName)

  return product
}

//for-admin side

export type GetProductsOfSingleShop = {
  pageNumber: number
  pageSize: number
  searchQuery: string
  sortBy: string
  order: string
  shopId: string
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
          .where('name', 'like', `% ${searchQuery}% `)
          .orWhere('price', 'like', `% ${searchQuery}% `)
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
