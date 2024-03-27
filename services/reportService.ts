import { Op } from 'sequelize'
import { OutgoingInvoice, ProductOutgoingInvoice, Cost } from '../db/models'

class ReportService {
  constructor() {}

  async getProductCost(productId: string, date: string): Promise<number> {
    const cost = await Cost.findOne({
      where: {
        productId,
        date,
      },
    })

    if (!cost) {
      throw new Error(`Cost for product ${productId} on date ${date} not found`)
    }

    return cost.value
  }

  async getReport(from: string, to: string) {
    const dailyReports: {
      date: string
      totalSales: number
      totalCost: number
      totalProfit: number
      profitability: number
    }[] = []

    const outgoingInvoices = await OutgoingInvoice.findAll({
      where: {
        date: {
          [Op.between]: [from, to],
        },
      },
    })

    for (const invoice of outgoingInvoices) {
      const productSales = await ProductOutgoingInvoice.findAll({
        where: {
          documentId: invoice.id,
        },
      })

      let totalSales = 0
      let totalCost = 0

      for (const sale of productSales) {
        totalSales += sale.price * sale.quantity
        totalCost +=
          (await this.getProductCost(sale.productId, invoice.date)) *
          sale.quantity
      }

      const totalProfit = totalSales - totalCost
      const profitability = (totalProfit / totalCost) * 100

      dailyReports.push({
        date: invoice.date,
        totalSales,
        totalCost,
        totalProfit,
        profitability,
      })
    }

    return dailyReports
  }
}

export default new ReportService()
