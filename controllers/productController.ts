import { Request, Response } from 'express'
import productService from '../services/productService'

class ProductController {
  constructor() {}

  async create(req: Request, res: Response) {
    try {
      const { name } = req.body

      const product = await productService.createProduct(name)

      res.status(200).json({ product })
    } catch (error: any) {
      res
        .status(500)
        .json({ error: 'Error creating product', reason: error.message })
    }
  }
}

export default new ProductController()
