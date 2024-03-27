import { Router } from 'express'
import arrivalController from '../controllers/arrivalController'
const router = Router()

router.post('/', arrivalController.create)

export default router
