import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()
import { sequelize } from './db/index'
import router from './routes/index'
import * as models from './db/models/index'
const {
  Product,
  IncomingInvoice,
  ProductIncomingInvoice,
  ProductOutgoingInvoice,
  OutgoingInvoice,
  Cost,
} = models

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use('/api', router)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (error) {
    console.error(error)
  }
}

start()
