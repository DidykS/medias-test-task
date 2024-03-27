import { Router } from 'express'
const router = Router()
import orderController from '../controllers/orderController'

router.post('/', orderController.create)

export default router
