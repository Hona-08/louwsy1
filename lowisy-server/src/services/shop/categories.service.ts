import { OrderByDirection, raw } from 'objection'
import { TABLES } from '../../constants/tables'
import { Categories, Product, Shop } from '../../models'
import { generateTree } from '../../utils/common/format'
import { BadRequestError, NotFoundError } from '../../errors'

type CreateCategory = {
  categories: Partial<Categories>
}
export async function createCategory({ categories }: CreateCategory) {
  await Categories.query().insertAndFetch(categories)
}

export async function createBulkCategory(
  fileData: Categories[],
  shopId: string,
) {
  if (fileData.length > 0) {
    fileData.map(async (category) => {
      //console.log({ category })
      category.shopId = shopId
      await Categories.query().insertAndFetch(category)
    })
  }
}

export async function createBulkSubCategories(
  fileData: Categories[],
  shopId: string,
  parentId: string,
) {
  if (fileData.length > 0) {
    fileData.map(async (category) => {
      //console.log({ category })
      category.shopId = shopId
      category.parentId = parentId
      await Categories.query().insertAndFetch(category)
    })
  }
}

export type GetCategories = {
  pageNumber: number
  pageSize: number
  searchQuery: string
  sortBy: string
  order: string
  filterStatus: string
}

export async function getCategories({
  pageNumber,
  pageSize,
  searchQuery,
  sortBy,
  order,
  filterStatus,
}: GetCategories) {
  const query = Categories.query()
    .where((builder) => {
      if (searchQuery?.length > 0) {
        builder
          .where('name', 'like', `%${searchQuery}%`)
          .orWhere('description', 'like', `%${searchQuery}%`)
      }
      if (filterStatus) {
        builder.where('isArchive', filterStatus == 'All' ? 0 : 1)
      }
    })
    .whereNull('parentId')
    .page(pageNumber, pageSize)

  if (sortBy?.length > 0) {
    query.orderBy(sortBy, order as OrderByDirection)
  }

  const categories = await query

  return categories
}

export async function getCategoriesAndSubCategories() {
  const categories = await Categories.query().where({ isArchive: false })

  return categories
}

export async function getCategoriesInTreeFormat(shopId: string) {
  const categories = await Categories.query().where({
    isArchive: false,
    shopId,
  })

  return generateTree({ data: categories, childrenKey: 'subCategories' })
}

export async function getCategory(id: string, filterStatus: string) {
  // const subCategories = await Categories.query().where({ parentId: id })
  // const category: any = await Categories.query()
  //   .where(`${TABLES.CATEGORIES}.id`, id)
  //   .first()

  // category.subCategories = subCategories
  console.log({ filterStatus })
  const category = await Categories.query()
    .findById(id)
    .withGraphFetched('[subCategories]')
    .modifyGraph('subCategories', (builder) => {
      if (filterStatus) {
        builder.where('isArchive', filterStatus == 'All' ? 0 : 1)
      }
    })

  return category
}

type UpdateCategory = {
  category: Partial<Categories>
  categoryId: string
}
export async function updateCategory({ category, categoryId }: UpdateCategory) {
  await Categories.query().patch(category).where({
    id: categoryId,
  })
}

export async function deleteCategory(id: string) {
  //check id
  const category = await Categories.query().where({ id }).first()

  if (!category) {
    throw new BadRequestError('NOT_FOUND')
  }

  //check the product before delete the category
  const products = await Product.query().where({ categoriesId: id })

  if (products) {
    console.log({ products })
    await Product.query()
      .patch({
        categoriesId: null,
      })
      .where({ categoriesId: id })
  }
  //check if category have subcategories
  const subCategories = await Categories.query().where({ parentId: id })

  //delete subcategories before category
  if (subCategories) {
    await Categories.query().delete().where({ parentId: id })
  }

  //delete category
  await Categories.query().deleteById(id)
}

export async function deleteBulkCategories(ids: string[]) {
  //delete subcategories first
  if (ids.length > 0) {
    ids.map(async (id: string) => {
      //check the product before delete the category
      const products = await Product.query().where({ categoriesId: id })

      if (products) {
        console.log({ products })
        await Product.query()
          .patch({
            categoriesId: null,
          })
          .where({ categoriesId: id })
      }
      await Categories.query().delete().where({ parentId: id })
    })
  }
  //delete categories
  await Categories.query().delete().whereIn('id', ids)
}

export async function archiveBulkCategories(ids: string[]) {
  //delete subcategories first
  if (ids.length > 0) {
    ids.map(async (id: string) => {
      await Categories.query()
        .patch({
          isArchive: raw(`NOT is_archive`),
        })
        .where({ parentId: id })
    })
  }
  //delete categories
  await Categories.query()
    .patch({
      isArchive: raw(`NOT is_archive`),
    })
    .whereIn('id', ids)
}

export async function getShopCategoryByCategoryId(categoryId: string) {
  const shops = await Shop.query().where({ categoryId })

  return shops
}

export async function getTotalNumberOfCategories() {
  return await Categories.query().count('* as categoriesCount')
}
