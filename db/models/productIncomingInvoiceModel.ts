import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../index'
import IncomingInvoice from './incomingInvoiceModel'
import Product from './productModel'

class ProductIncomingInvoice extends Model {
  public id!: string
  public documentId!: string
  public productId!: string
  public price!: number
  public quantity!: number
}

ProductIncomingInvoice.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    documentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ProductIncomingInvoice',
    tableName: 'product_incoming_invoices',
    timestamps: false,
  },
)

ProductIncomingInvoice.belongsTo(Product, { foreignKey: 'productId' })
ProductIncomingInvoice.belongsTo(IncomingInvoice, { foreignKey: 'documentId' })

export default ProductIncomingInvoice
