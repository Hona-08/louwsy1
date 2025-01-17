/* eslint-disable prettier/prettier */
import { Router } from 'express'
import { adminAuthController } from '../../controllers/admin'

const router = Router()

router.post('/login', adminAuthController.login)
router.post('/logout', adminAuthController.logout)

export default router
