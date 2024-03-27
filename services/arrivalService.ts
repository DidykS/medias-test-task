import { IncomingInvoice, ProductIncomingInvoice } from '../db/models'
import { calculateProductCost } from '../utils/calculateProductCost'
import { Cost } from '../db/models'
import { v4 as uuid4 } from 'uuid'
import moment from 'moment'

class ArrivalService {
  constructor() {}

  async createIncomingInvoice(
    date: string,
    productsInfo: {
      productId: string
      price: number
      quantity: number
    }[],
  ) {
    try {
      const incomingInvoiceId = uuid4()
      const incomingInvoice = await IncomingInvoice.create({
        id: incomingInvoiceId,
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
          true,
        )

        console.log(productCost, 'productCost')

        await Cost.create({
          id: uuid4(),
          date: moment(date).startOf('month').format('YYYY-MM-DD'),
          productId: productInfo.productId,
          value: productCost,
          isActual: true,
        })

        await ProductIncomingInvoice.create({
          id: uuid4(),
          documentId: incomingInvoice.id,
          productId: productInfo.productId,
          price: productInfo.price,
          quantity: productInfo.quantity,
        })
      }

      return incomingInvoice.toJSON()
    } catch (error: any) {
      throw new Error(error)
    }
  }
}

export default new ArrivalService()
