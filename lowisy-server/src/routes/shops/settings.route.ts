import { Router } from 'express'
import { shopSettingController } from '../../controllers/shop'
import { userAuthMiddleware } from '../../middlewares'
import { upload } from '../../utils/common/file-upload'
import { shopSettingsValidator } from '../../validators'

const router = Router()

router.get(
  '/baseline',
  userAuthMiddleware.protect(),
  shopSettingController.getShop,
)
router.patch(
  '/baseline',
  userAuthMiddleware.protect(),
  shopSettingController.updateShop,
),
  router.get(
    '/branding',
    userAuthMiddleware.protect(),
    shopSettingController.getShop,
  )
router.patch(
  '/branding',
  upload.fields([
    {
      name: 'coverImage',
    },
    {
      name: 'logo',
    },
  ]),
  userAuthMiddleware.protect(),
  shopSettingController.updateShop,
)

export default router
