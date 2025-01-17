/* eslint-disable prettier/prettier */
import { Router } from 'express'
import { shopContactUsValidator } from '../../validators'
import { shopContactUsController } from '../../controllers/shop'
import { userAuthMiddleware } from '../../middlewares'
const router = Router()

router.get(
  '/',
  userAuthMiddleware.protect(),
  shopContactUsValidator.getContactUs,
  shopContactUsController.getContactUs,
)

router.get(
  '/:contactUsId',
  userAuthMiddleware.protect(),
  shopContactUsValidator.getContactUsById,
  shopContactUsController.getContactUsById,
)
router.post(
  '/',
  userAuthMiddleware.protect(),
  shopContactUsValidator.createContactUs,
  shopContactUsController.createContactUs,
)

router.patch(
  '/:contactUsId',
  userAuthMiddleware.protect(),
  shopContactUsValidator.updateContactUs,
  shopContactUsController.updateContactUs,
)
router.delete(
  '/:contactUsId',
  userAuthMiddleware.protect(),
  shopContactUsValidator.deleteContactUs,
  shopContactUsController.deleteContactUs,
)

export default router
