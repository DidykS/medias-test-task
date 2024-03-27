import { Request, Response } from 'express'
import arrivalService from '../services/arrivalService'

class ArrivalController {
  constructor() {}

  async create(req: Request, res: Response) {
    try {
      const { date, products } = req.body
      const incomingInvoice = await arrivalService.createIncomingInvoice(
        date,
        products,
      )

      res.status(200).json({ incomingInvoice })
    } catch (error: any) {
      res
        .status(500)
        .json({
          error: 'Error creating arrival invoice',
          reason: error.message,
        })
    }
  }
}

export default new ArrivalController()
