import { Request, Response } from 'express'
import orderService from '../services/orderService'

class OrderController {
  constructor() {}

  async create(req: Request, res: Response) {
    try {
      const { date, products } = req.body
      const outgoingInvoice = await orderService.createOutgoingInvoice(
        date,
        products,
      )

      res.status(200).json({ outgoingInvoice })
    } catch (error: any) {
      res
        .status(500)
        .json({ error: 'Error creating order invoice', reason: error.message })
    }
  }
}

export default new OrderController()
