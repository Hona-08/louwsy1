import { OrderByDirection, raw } from 'objection'
import { TABLES } from '../../constants/tables'
import { Order, Product, ProductImages } from '../../models'
import { Customer } from '../../models/customer'

type CreateProduct = {
  product: Partial<Product>
  productImages: any
}

export async function getTotalNumberOfCounts(shopId: string) {
  const totalProducts = await Product.query()
    .count('* as totalProducts')
    .where({ shopId })

  const customerIds = (
    await Order.query().select('customerId').where({ shopId })
  ).map((el) => el.customerId)

  const totalCustomers = await Customer.query()
    .count('* as totalCustomers')
    .whereIn('id', customerIds)
  const totalOrders = await Order.query()
    .count('* as totalOrders')
    .where({ shopId })
  return { totalProducts, totalCustomers, totalOrders }
}
export async function createProduct({ product, productImages }: CreateProduct) {
  const { id: productId } = await Product.query().insertAndFetch(product)

  const productImagesData = productImages.map(({ key }: { key: string }) => {
    return { productId, name: key }
  })

  await ProductImages.query().insertGraph(productImagesData)
}

export async function createBulkProduct(
  fileData: Partial<Product[]>,
  shopId: string,
) {
  if (fileData.length > 0) {
    fileData.map(async (data) => {
      const product = { ...data, shopId }
      await Product.query().insertAndFetch(product)
    })
  }
}

export type GetProducts = {
  pageNumber: number
  pageSize: number
  searchQuery: string
  sortBy: string
  order: string
  filterStatus: string
}

export async function getProducts(
  {
    pageNumber,
    pageSize,
    searchQuery,
    sortBy,
    order,
    filterStatus,
  }: GetProducts,
  shopId: string,
) {
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
      if (filterStatus) {
        builder.where('isArchive', filterStatus == 'All' ? 0 : 1)
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

export async function getSearchProducts({
  productName,
  sortedBy,
}: {
  productName: string
  sortedBy: string
}) {
  const query = Product.query()
    .withGraphFetched('productImages')
    .modifyGraph('productImages', (builder) => {
      builder.select(['name'])
    })
    .where((builder) => {
      if (productName?.length > 0 && productName !== 'all') {
        builder
          .where('name', 'like', `%${productName}%`)
          .orWhere('shortDescription', 'like', `%${productName}%`)
          .orWhere('longDescription', 'like', `%${productName}%`)
      }
    })

  if (sortedBy?.length > 0) {
    const [column, order] = sortedBy.split('|')
    query.orderBy(column, order as OrderByDirection)
  }

  const products = await query
  return products
}

export async function getFeaturedProducts({ latest }: { latest: string }) {
  const query = Product.query()
    .withGraphFetched('productImages')
    .modifyGraph('productImages', (builder) => {
      builder.select(['name'])
    })
    .where('isFeatured', 1)

  if (latest === 'true') {
    query.orderBy('createdAt', 'desc' as OrderByDirection)
  }

  const products = await query

  return products
}

export async function getProduct(id: string) {
  const product = await Product.query()
    .withGraphJoined('productImages')
    .modifyGraph('productImages', (builder) => {
      builder.select(['name as images'])
    })
    .where(`${TABLES.PRODUCT}.id`, id)
    .first()
  return product
}

type UpdateProduct = {
  product: Partial<Product>
  productId: string
}

export async function updateProduct({ product, productId }: UpdateProduct) {
  await Product.query().patch(product).where({
    id: productId,
  })
}

export async function deleteProduct(id: string) {
  // delete images of that product
  await ProductImages.query().delete().where({ productId: id })

  //delete product
  await Product.query().deleteById(id)
}

export async function deleteBulkProducts(ids: string[]) {
  if (ids.length > 0) {
    ids.map(async (id: string) => {
      // delete images of that product
      await ProductImages.query().delete().where({ productId: id })
    })
  }
  //delete products
  await Product.query().delete().whereIn('id', ids)
}

export async function archiveBulkProducts(ids: string[]) {
  //archive-unarchive products
  await Product.query()
    .patch({
      isArchive: raw(`NOT is_archive`),
    })
    .whereIn('id', ids)
}
