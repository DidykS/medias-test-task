import { Router } from 'express'
import productsRouter from './productsRouter'
import arrivalsRouter from './arrivalsRouter'
import ordersRouter from './ordersRouter'
import costRouter from './costRouter'
import reportsRouter from './reportsRouter'
const router = Router()

router.use('/products', productsRouter)
router.use('/arrivals', arrivalsRouter)
router.use('/orders', ordersRouter)
router.use('/cost', costRouter)
router.use('/report', reportsRouter)

export default router
