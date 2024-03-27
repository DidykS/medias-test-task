import moment from 'moment'
import { Op } from 'sequelize'
import {
  IncomingInvoice,
  ProductIncomingInvoice,
  OutgoingInvoice,
  ProductOutgoingInvoice,
  Cost,
} from '../db/models'

export const calculateProductCost = async (
  productId: string,
  isIncoming: boolean,
): Promise<number> => {
  const startOfMonthDate = moment.utc().startOf('month').format('YYYY-MM-DD')
  const endOfMonthDate = moment.utc().endOf('month').format('YYYY-MM-DD')

  const hasFirstMonthData = isIncoming
    ? await ProductIncomingInvoice.findOne({ where: { productId } })
    : await ProductOutgoingInvoice.findOne({ where: { productId } })

  if (!hasFirstMonthData) {
    return 0
  }

  const invoices = isIncoming
    ? await IncomingInvoice.findAll({
        where: { date: { [Op.between]: [startOfMonthDate, endOfMonthDate] } },
      })
    : await OutgoingInvoice.findAll({
        where: { date: { [Op.between]: [startOfMonthDate, endOfMonthDate] } },
      })

  let totalStockCost = 0
  if (!isIncoming) {
    const previousMonthCost = await Cost.findOne({
      where: { productId, isActual: true },
      order: [['date', 'DESC']],
    })
    if (previousMonthCost) {
      totalStockCost = previousMonthCost.value
    }
  }

  let totalProductCost = 0
  for (const invoice of invoices) {
    const productInvoice = isIncoming
      ? await ProductIncomingInvoice.findOne({
          where: { documentId: invoice.id, productId },
        })
      : await ProductOutgoingInvoice.findOne({
          where: { documentId: invoice.id, productId },
        })
    if (productInvoice) {
      totalProductCost += productInvoice.price * productInvoice.quantity
    }
  }

  const currentProductCost =
    totalStockCost === 0 ? totalProductCost : totalProductCost / totalStockCost

  return currentProductCost
}
