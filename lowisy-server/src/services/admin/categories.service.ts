import { OrderByDirection } from 'objection'
import { TABLES } from '../../constants/tables'
import { Categories, Shop } from '../../models'
import { generateTree } from '../../utils/common/format'

type CreateCategory = {
  categories: Partial<Categories>
}
export async function createCategory({ categories }: CreateCategory) {
  await Categories.query().insertAndFetch(categories)
}

export type GetCategories = {
  pageNumber: number
  pageSize: number
  searchQuery: string
  sortBy: string
  order: string
}

export async function getCategories({
  pageNumber,
  pageSize,
  searchQuery,
  sortBy,
  order,
}: GetCategories) {
  const query = Categories.query()
    .where((builder) => {
      if (searchQuery?.length > 0) {
        builder
          .where('name', 'like', `%${searchQuery}%`)
          .orWhere('description', 'like', `%${searchQuery}%`)
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
  const categories = await Categories.query()

  return categories
}

export async function getCategoriesInTreeFormat() {
  const categories = await Categories.query()

  return generateTree({ data: categories, childrenKey: 'subCategories' })
}

export async function getCategory(id: string) {
  const category = await Categories.query()
    // .withGraphJoined('productImages')
    // .modifyGraph('productImages', (builder) => {
    //     builder.select(['name as images'])
    // })
    .where(`${TABLES.CATEGORIES}.id`, id)
    .first()

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
  //delete
  await Categories.query().deleteById(id)
}

export async function getShopCategoryByCategoryId(categoryId: string) {
  const shops = await Shop.query()
    // .withGraphJoined('productImages')
    // .modifyGraph('productImages', (builder) => {
    //     builder.select(['name as images'])
    // })
    //.where(`${TABLES.CATEGORIES}.id`, id)
    .where({ categoryId })

  return shops
}
