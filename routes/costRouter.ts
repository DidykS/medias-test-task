import { Router } from 'express'
import costController from '../controllers/costController'
const router = Router()

router.get('/:id', costController.getProductCost)

export default router
