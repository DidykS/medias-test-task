// CostController.ts
import { Request, Response } from 'express'
import costService from '../services/costService'

class CostController {
  constructor() {}

  async getProductCost(req: Request, res: Response) {
    try {
      const productId = req.params.id
      const date = req.query.date as string

      const cost = await costService.getProductCost(productId, date)

      res.status(200).json({ cost })
    } catch (error: any) {
      res
        .status(500)
        .json({ error: 'Error getting product cost', reason: error.message })
    }
  }
}

export default new CostController()
