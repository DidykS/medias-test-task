import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../index'

class IncomingInvoice extends Model {
  public id!: string
  public date!: string
}

IncomingInvoice.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'IncomingInvoice',
    tableName: 'incoming_invoices',
    timestamps: true,
    indexes: [
      {
        fields: ['date'],
      },
    ],
  },
)

export default IncomingInvoice
