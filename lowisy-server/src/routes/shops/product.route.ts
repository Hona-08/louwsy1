import { Router } from 'express'
import { shopProductController } from '../../controllers/shop'
import { userAuthMiddleware } from '../../middlewares'
import { customerAuthMiddleware } from '../../middlewares/customers'
import { upload } from '../../utils/common/file-upload'
import { shopProductValidator } from '../../validators'
import multer from 'multer'
const storage = multer.memoryStorage()
const uploadCsv = multer({ storage: storage })

const router = Router()

router.patch(
  '/delete-selected-ids',
  userAuthMiddleware.protect(),
  shopProductController.deleteBulkProducts,
)

router.patch(
  '/archive-selected-ids',
  userAuthMiddleware.protect(),
  shopProductController.archiveBulkProducts,
)

router.get(
  '/total-products',
  userAuthMiddleware.protect(),
  shopProductController.getTotalNumberOfCounts,
)

router.get(
  '/',
  userAuthMiddleware.protect(),
  shopProductValidator.getProducts,
  shopProductController.getProducts,
)

router.get(
  '/search',
  customerAuthMiddleware.protect(),
  shopProductController.getSearchProducts,
)

router.get(
  '/featured',
  customerAuthMiddleware.protect(),
  shopProductController.getFeaturedProducts,
)

router.post(
  '/',
  upload.array('images', 10),
  userAuthMiddleware.protect(),
  shopProductValidator.createProductMethod,
  shopProductController.createProduct,
)

router.post(
  '/upload',
  uploadCsv.single('file'),
  userAuthMiddleware.protect(),
  shopProductController.createBulkProduct,
)

router.get(
  '/:productId',
  //userAuthMiddleware.protect(),
  shopProductValidator.getProduct,
  shopProductController.getProduct,
)
router.delete(
  '/:productId',
  userAuthMiddleware.protect(),
  shopProductValidator.deleteProduct,
  shopProductController.deleteProduct,
)
router.patch(
  '/:productId',
  userAuthMiddleware.protect(),
  shopProductValidator.updateProduct,
  shopProductController.updateProduct,
)

export default router
