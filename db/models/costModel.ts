import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../index'
import Product from './productModel'

class Cost extends Model {
  public id!: string
  public productId!: string
  public date!: string
  public value!: number
  public isActual!: boolean
}

Cost.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    isActual: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Cost',
    tableName: 'costs',
    timestamps: true,
    indexes: [
      {
        fields: ['date'],
      },
    ],
  },
)

Cost.belongsTo(Product, { foreignKey: 'productId' })

export default Cost
