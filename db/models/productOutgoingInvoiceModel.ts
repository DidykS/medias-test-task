import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../index'
import Product from './productModel'
import OutgoingInvoice from './outgoingInvoiceModel'

class ProductOutgoingInvoice extends Model {
  public id!: string
  public documentId!: string
  public productId!: string
  public price!: number
  public quantity!: number
}

ProductOutgoingInvoice.init(
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
    modelName: 'ProductOutgoingInvoice',
    tableName: 'product_outgoing_invoices',
    timestamps: false,
  },
)

ProductOutgoingInvoice.belongsTo(Product, { foreignKey: 'productId' })
ProductOutgoingInvoice.belongsTo(OutgoingInvoice, { foreignKey: 'documentId' })

export default ProductOutgoingInvoice
