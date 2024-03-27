import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../index'
import { v4 as uuid4 } from 'uuid'
import ProductOutgoingInvoice from './productOutgoingInvoiceModel'

class OutgoingInvoice extends Model {
  public id!: string
  public date!: string
}

OutgoingInvoice.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'OutgoingInvoice',
    tableName: 'outgoing_invoices',
    timestamps: true,
    indexes: [
      {
        fields: ['date'],
      },
    ],
  },
)

export default OutgoingInvoice
