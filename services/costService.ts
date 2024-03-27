import { Cost } from '../db/models'
import moment from 'moment'

class CostService {
  constructor() {}

  async getProductCost(productId: string, dateParam?: string) {
    try {
      if (dateParam) {
        const formattedDate = moment(dateParam).startOf('month').toDate()
        const cost = await Cost.findOne({
          where: { productId, date: formattedDate },
        })

        if (!cost) {
          throw new Error('Cost not found')
        }

        return cost.toJSON()
      } else {
        const cost = await Cost.findOne({
          where: { productId, isActual: true },
        })

        if (!cost) {
          throw new Error('Cost not found')
        }

        return cost.toJSON()
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }
}

export default new CostService()
