/* eslint-disable prettier/prettier */
import { Router } from 'express'
import { adminCategoriesController } from '../../controllers/admin'
import { AdminAuthMiddleware } from '../../middlewares/admin'
import { adminCategoriesValidator } from '../../validators'
const router = Router()

router.get(
  '/',
  AdminAuthMiddleware.protect(),
  adminCategoriesController.getCategories,
)
router.get(
  '/:categoryId',
  AdminAuthMiddleware.protect(),
  adminCategoriesValidator.getCategory,
  adminCategoriesController.getCategory,
)
router.delete(
  '/:categoryId',
  AdminAuthMiddleware.protect(),
  adminCategoriesValidator.deleteCategories,
  adminCategoriesController.deleteCategory,
)
router.patch(
  '/:categoryId',
  AdminAuthMiddleware.protect(),
  adminCategoriesValidator.updateCategories,
  adminCategoriesController.updateCategory,
)
router.post(
  '/',
  // adminCategoriesValidator.createCategories,
  AdminAuthMiddleware.protect(),
  adminCategoriesValidator.createCategories,
  adminCategoriesController.createCategory,
)
export default router
