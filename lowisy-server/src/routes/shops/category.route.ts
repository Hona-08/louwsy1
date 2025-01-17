import { Router } from 'express'
import {
  shopCategoryController,
  shopOrderController,
} from '../../controllers/shop'
import { userAuthMiddleware } from '../../middlewares'
import multer from 'multer'

// Multer middleware for handling file uploads
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const router = Router()

router.patch(
  '/delete-selected-ids',
  userAuthMiddleware.protect(),
  shopCategoryController.deleteBulkCategories,
)

router.patch(
  '/archive-selected-ids',
  userAuthMiddleware.protect(),
  shopCategoryController.archiveBulkCategories,
)

router.get(
  '/total-categories',
  userAuthMiddleware.protect(),
  shopCategoryController.getTotalNumberOfCategories,
)
router.get(
  '/',
  userAuthMiddleware.protect(),
  shopCategoryController.getCategories,
)
router.get(
  '/all',
  //userAuthMiddleware.protect(),
  shopCategoryController.getCategoriesAndSubCategories,
)
router.get(
  '/format-tree',
  userAuthMiddleware.protect(),
  shopCategoryController.getCategoriesInTreeFormat,
)
router.get(
  '/:categoryId/shop',
  userAuthMiddleware.protect(),
  shopCategoryController.getShopCategoryByCategoryId,
)
router.post(
  '/',
  userAuthMiddleware.protect(),
  shopCategoryController.createCategory,
)

router.post(
  '/upload',
  upload.single('file'),
  userAuthMiddleware.protect(),
  shopCategoryController.createBulkCategory,
)

router.post(
  '/:parentId/upload',
  upload.single('file'),
  userAuthMiddleware.protect(),
  shopCategoryController.createBulkSubCategories,
)

router.get(
  '/:categoryId',
  userAuthMiddleware.protect(),
  shopCategoryController.getCategory,
)
router.delete(
  '/:categoryId',
  userAuthMiddleware.protect(),
  shopCategoryController.deleteCategory,
)

router.patch(
  '/:categoryId',
  userAuthMiddleware.protect(),
  shopCategoryController.updateCategory,
)

export default router
