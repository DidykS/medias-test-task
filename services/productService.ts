import { Product } from '../db/models'
import { v4 as uuid4 } from 'uuid'

class ProductService {
  constructor() {}

  async createProduct(name: string) {
    try {
      const ifExistProduct = await Product.findOne({ where: { name } })

      if (ifExistProduct) {
        throw new Error('Product already exists!')
      }

      const product = await Product.create({ id: uuid4(), name })

      return product.toJSON()
    } catch (error: any) {
      throw new Error(error)
    }
  }
}

export default new ProductService()
