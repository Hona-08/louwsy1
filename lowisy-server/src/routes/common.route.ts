/* eslint-disable prettier/prettier */
import { Router } from 'express'
import { commonController } from '../controllers/admin'
import { sheetController } from '../controllers/sheet'

const router = Router()

router.get('/countries', commonController.getCountries)
router.post('/contact-us', sheetController.saveContactUs)
router.post('/recommend-restaurant', sheetController.saveRecommendedRestaurant)
router.post('/recaptcha', commonController.verifyRecaptcha)
router.get('/slugs', commonController.getAllSlugs)

export default router
