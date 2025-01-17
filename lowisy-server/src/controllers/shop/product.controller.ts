import { Request, Response } from 'express'
import { json } from 'stream/consumers'
import { lang } from '../../lang'
import { shopProductService } from '../../services/shop'
import { GetProducts } from '../../services/shop/product.service'
import Papa from 'papaparse'
import XLSX from 'xlsx'

/**
 * @route GET /api/shops/products
 * @access Private (By  admin of company)
 * @desc Gets all the products
 */

export async function getProducts(req: Request, res: Response) {
  const shopId = req.authUser.id

  const data = await shopProductService.getProducts(
    req.query as any as GetProducts,
    shopId,
  )
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

/**
 * @route GET /api/shops/products
 * @access Private (By  admin of company)
 * @desc Gets all the products
 */

export async function getSearchProducts(req: Request, res: Response) {
  const data = await shopProductService.getSearchProducts(req.query as any)
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

/**
 * @route GET /api/shops/products
 * @access Private (By  admin of company)
 * @desc Gets all the products
 */

export async function getFeaturedProducts(req: Request, res: Response) {
  const data = await shopProductService.getFeaturedProducts(req.query as any)
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

/**
 * @route GET /api/shops/products/:productId
 * @access Private (By  admin of company)
 * @desc get a product by it's id
 */
export async function getProduct(req: Request, res: Response) {
  const data = await shopProductService.getProduct(req.params.productId)
  res.status(200).json({
    message: lang[req.lang].FETCHED_SUCCESSFULLY,
    data,
  })
}

/**
 * @route DELETE /api/shops/products/:productId
 * @access Private (By  admin of company)
 * @desc Deletes  the product by it's id
 */
export async function deleteProduct(req: Request, res: Response) {
  await shopProductService.deleteProduct(req.params.productId)
  res.status(200).json({
    message: lang[req.lang].DELETED_SUCCESSFULLY,
  })
}

/**
 * @route PUT /api/shops/products/:productId
 * @access Private (By  admin of company)
 * @desc Updates the product by it's id
 */
export async function updateProduct(req: Request, res: Response) {
  const { images, ...product } = req.body
  await shopProductService.updateProduct({
    product,
    productId: req.params.productId,
  })
  res.status(200).json({
    message: lang[req.lang].UPDATED_SUCCESSFULLY,
  })
}
/**
 * @route POST /api/shops/products
 * @access Private (By  admin of company)
 * @desc Creates a new product
 */
export async function createProduct(req: Request, res: Response) {
  const shopId = req.authUser.id
  const { images, ...product } = req.body
  product.shopId = shopId
  console.log(req.body)
  await shopProductService.createProduct({ productImages: req.files, product })

  res.status(200).json({
    message: lang[req.lang].CREATED_SUCCESSFULLY,
  })
}

export async function createBulkProduct(req: Request, res: Response) {
  const shopId = req.authUser.id
  const file = req.file

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

  await shopProductService.createBulkProduct(fileData as any, shopId as string)

  // You can perform additional processing or save the data to a database here

  res.status(200).json({
    message: lang[req.lang].CREATED_SUCCESSFULLY,
  })
}

export async function getTotalNumberOfCounts(req: Request, res: Response) {
  const shopId = req.authUser.id
  const data = await shopProductService.getTotalNumberOfCounts(shopId)
  console.log({ lang: req.lang })
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
export async function deleteBulkProducts(req: Request, res: Response) {
  await shopProductService.deleteBulkProducts(req.body.ids)
  res.status(200).json({
    message: lang[req.lang].DELETED_SUCCESSFULLY,
  })
}

/**
 * @route DELETE /api/categories/products/:productId
 * @access Private (By  admin of company)
 * @desc Deletes  the product by it's id
 */
export async function archiveBulkProducts(req: Request, res: Response) {
  console.log('Bulk archive called')
  console.log('body', req.body)
  await shopProductService.archiveBulkProducts(req.body.ids)
  res.status(200).json({
    message: lang[req.lang].SUCCESS,
  })
}
