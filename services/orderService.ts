import { Cost, OutgoingInvoice, ProductOutgoingInvoice } from '../db/models'
import { v4 as uuid4 } from 'uuid'
import moment from 'moment'
import { calculateProductCost } from '../utils/calculateProductCost'

class OrderService {
  constructor() {}

  async createOutgoingInvoice(
    date: string,
    productsInfo: {
      productId: string
      price: number
      quantity: number
    }[],
  ) {
    try {
      const outgoingInvoiceId = uuid4()

      const outgoingInvoice = await OutgoingInvoice.create({
        id: outgoingInvoiceId,
        date,
      })

      for (const productInfo of productsInfo) {
        const actualCost = await Cost.findOne({
          where: { productId: productInfo.productId, isActual: true },
        })

        if (actualCost) {
          await actualCost.update({ isActual: false })
        }

        const productCost = await calculateProductCost(
          productInfo.productId,
          false,
        )

        await Cost.create({
          id: uuid4(),
          date: moment(date).startOf('month').format('YYYY-MM-DD'),
          productId: productInfo.productId,
          value: productCost,
          isActual: true,
        })

        await ProductOutgoingInvoice.create({
          id: uuid4(),
          documentId: outgoingInvoiceId,
          productId: productInfo.productId,
          price: productInfo.price,
          quantity: productInfo.quantity,
        })
      }

      return outgoingInvoice.toJSON()
    } catch (error: any) {
      throw new Error(error)
    }
  }
}

export default new OrderService()
