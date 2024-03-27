import { Request, Response } from 'express'
import reportService from '../services/reportService'

class ReportController {
  constructor() {}

  async get(req: Request, res: Response) {
    try {
      const { from, to } = req.query

      if (!from || !to) {
        res.status(400).json({ error: 'Parameters from and to are required' })
        return
      }
      const dailySalesReport = await reportService.getReport(
        from as string,
        to as string,
      )

      res.status(200).json(dailySalesReport)
    } catch (error: any) {
      res
        .status(500)
        .json({ error: 'Error getting report', reason: error.message })
    }
  }
}

export default new ReportController()
