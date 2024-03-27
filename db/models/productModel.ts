import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../index'

class Product extends Model {
  public id!: string
  public name!: string
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,
  },
)

export default Product
