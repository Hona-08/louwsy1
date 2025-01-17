import { Request, Response } from 'express'
import { lang } from '../../lang'
import { adminCategoriesServices } from '../../services/admin'
import { shopCategoryService } from '../../services/shop'
import { GetCategories } from '../../services/shop/categories.service'

/**
 * @route GET /api/categories/products
 * @access Private (By  admin of company)
 * @desc Gets all the products
 */

export async function getCategories(req: Request, res: Response) {
  const data = await adminCategoriesServices.getCategories(
    req.query as any as GetCategories,
  )
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

export async function getCategoriesAndSubCategories(
  req: Request,
  res: Response,
) {
  const data = await adminCategoriesServices.getCategoriesAndSubCategories()
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}
export async function getCategoriesInTreeFormat(req: Request, res: Response) {
  const data = await adminCategoriesServices.getCategoriesInTreeFormat()
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

/**
 * @route GET /api/categories/products/:productId
 * @access Private (By  admin of company)
 * @desc get a product by it's id
 */
export async function getCategory(req: Request, res: Response) {
  const data = await adminCategoriesServices.getCategory(req.params.categoryId)
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

/**
 * @route DELETE /api/categories/products/:productId
 * @access Private (By  admin of company)
 * @desc Deletes  the product by it's id
 */
export async function deleteCategory(req: Request, res: Response) {
  await adminCategoriesServices.deleteCategory(req.params.categoryId)
  res.status(200).json({
    message: lang[req.lang].DELETED_SUCCESSFULLY,
  })
}

/**
 * @route PUT /api/categories/products/:productId
 * @access Private (By  admin of company)
 * @desc Updates the product by it's id
 */
export async function updateCategory(req: Request, res: Response) {
  const { ...category } = req.body
  await adminCategoriesServices.updateCategory({
    category,
    categoryId: req.params.categoryId,
  })

  res.status(200).json({
    message: lang[req.lang].UPDATED_SUCCESSFULLY,
  })
}
/**
 * @route POST /api/categories/products
 * @access Private (By  admin of company)
 * @desc Creates a new product
 */
export async function createCategory(req: Request, res: Response) {
  //const shopId = req.authUser.id
  const { ...categories } = req.body
  //categories.shopId = shopId
  await adminCategoriesServices.createCategory({ categories })

  res.status(200).json({
    message: lang[req.lang].CREATED_SUCCESSFULLY,
  })
}

/**
 * @route GET /api/categories/products/:productId
 * @access Private (By  admin of company)
 * @desc get a product by it's id
 */
export async function getShopCategoryByCategoryId(req: Request, res: Response) {
  const data = await shopCategoryService.getShopCategoryByCategoryId(
    req.params.categoryId,
  )
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}
