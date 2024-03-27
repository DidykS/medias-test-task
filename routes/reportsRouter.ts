import { Router } from 'express'
import reportsController from '../controllers/reportController'
const router = Router()

router.get('/', reportsController.get)

export default router
