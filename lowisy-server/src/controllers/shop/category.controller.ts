import { Request, Response } from 'express'
import { lang } from '../../lang'
import { shopCategoryService } from '../../services/shop'
import { GetCategories } from '../../services/shop/categories.service'
import XLSX from 'xlsx'
import Papa from 'papaparse'
/**
 * @route GET /api/categories/products
 * @access Private (By  admin of company)
 * @desc Gets all the products
 */

export async function getCategories(req: Request, res: Response) {
  const data = await shopCategoryService.getCategories(
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
  const data = await shopCategoryService.getCategoriesAndSubCategories()
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}
export async function getCategoriesInTreeFormat(req: Request, res: Response) {
  const shopId = req.authUser.id
  const data = await shopCategoryService.getCategoriesInTreeFormat(shopId)
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
  const data = await shopCategoryService.getCategory(
    req.params.categoryId,
    req.query.filterStatus as any as string,
  )
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
  await shopCategoryService.deleteCategory(req.params.categoryId)
  res.status(200).json({
    message: lang[req.lang].DELETED_SUCCESSFULLY,
  })
}

/**
 * @route DELETE /api/categories/products/:productId
 * @access Private (By  admin of company)
 * @desc Deletes  the product by it's id
 */
export async function deleteBulkCategories(req: Request, res: Response) {
  await shopCategoryService.deleteBulkCategories(req.body.ids)
  res.status(200).json({
    message: lang[req.lang].DELETED_SUCCESSFULLY,
  })
}

/**
 * @route DELETE /api/categories/products/:productId
 * @access Private (By  admin of company)
 * @desc Deletes  the product by it's id
 */
export async function archiveBulkCategories(req: Request, res: Response) {
  await shopCategoryService.archiveBulkCategories(req.body.ids)
  res.status(200).json({
    message: lang[req.lang].SUCCESS,
  })
}

/**
 * @route PUT /api/categories/products/:productId
 * @access Private (By  admin of company)
 * @desc Updates the product by it's id
 */
export async function updateCategory(req: Request, res: Response) {
  const { ...category } = req.body
  await shopCategoryService.updateCategory({
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
  const shopId = req.authUser.id
  const { ...categories } = req.body
  categories.shopId = shopId
  await shopCategoryService.createCategory({ categories })

  res.status(200).json({
    message: lang[req.lang].CREATED_SUCCESSFULLY,
  })
}

export async function createBulkCategory(req: Request, res: Response) {
  const file = req.file
  const shopId = req.authUser.id

  console.log({ file: req.file })
  if (!file) {
    return res.status(400).send('No file uploaded.')
  }

  const buffer = file.buffer
  const fileName = file.originalname
  console.log({ buffer })
  let fileData
  // Process the file based on its type (CSV or Excel)
  if (fileName.endsWith('.csv')) {
    fileData = Papa.parse(buffer.toString(), {
      header: true,
      dynamicTyping: true,
    }).data
    // Handle CSV data on the server as needed
    console.log('CSV Data:', fileData)
  } else if (fileName.endsWith('.xlsx')) {
    const workbook = XLSX.read(buffer, { type: 'buffer' })
    const sheetName = workbook.SheetNames[0]
    const csvData = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName])

    // Parse CSV data
    fileData = Papa.parse(csvData, {
      header: true,
      dynamicTyping: true,
    }).data
    // Handle Excel data on the server as needed
    console.log('Excel Data:', fileData)
  }

  await shopCategoryService.createBulkCategory(fileData as any, shopId)

  // You can perform additional processing or save the data to a database here

  res.status(200).json({
    message: lang[req.lang].CREATED_SUCCESSFULLY,
  })
}

export async function createBulkSubCategories(req: Request, res: Response) {
  const file = req.file
  const shopId = req.authUser.id

  if (!file) {
    return res.status(400).send('No file uploaded.')
  }

  const buffer = file.buffer
  const fileName = file.originalname
  console.log({ buffer })
  let fileData
  // Process the file based on its type (CSV or Excel)
  if (fileName.endsWith('.csv')) {
    fileData = Papa.parse(buffer.toString(), {
      header: true,
      dynamicTyping: true,
    }).data
    // Handle CSV data on the server as needed
    console.log('CSV Data:', fileData)
  } else if (fileName.endsWith('.xlsx')) {
    const workbook = XLSX.read(buffer, { type: 'buffer' })
    const sheetName = workbook.SheetNames[0]
    const csvData = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName])

    // Parse CSV data
    fileData = Papa.parse(csvData, {
      header: true,
      dynamicTyping: true,
    }).data
    // Handle Excel data on the server as needed
    console.log('Excel Data:', fileData)
  }

  await shopCategoryService.createBulkSubCategories(
    fileData as any,
    shopId,
    req.params.parentId,
  )

  // You can perform additional processing or save the data to a database here

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

export async function getTotalNumberOfCategories(req: Request, res: Response) {
  const data = await shopCategoryService.getTotalNumberOfCategories()
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}
