import { Router } from 'express'
import { adminSettingsController } from '../../controllers/admin'
import { AdminAuthMiddleware } from '../../middlewares/admin'
import { upload } from '../../utils/common/file-upload'

const router = Router()

router.get(
  '/baseline/:shopId',
  AdminAuthMiddleware.protect(),
  //userAuthMiddleware.protect(),
  adminSettingsController.getShop,
)
router.patch(
  '/baseline/:shopId',
  AdminAuthMiddleware.protect(),
  adminSettingsController.updateShop,
),
  router.get(
    '/branding/:shopId',
    AdminAuthMiddleware.protect(),
    adminSettingsController.getShop,
  )
router.patch(
  '/branding/:shopId',
  AdminAuthMiddleware.protect(),
  upload.fields([
    {
      name: 'coverImage',
    },
    {
      name: 'logo',
    },
  ]),
  adminSettingsController.updateShop,
)

export default router
