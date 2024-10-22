const { Model, DataTypes, Sequelize } = require('sequelize');
const { ORDER_TABLE } = require('./order.model');
const { PRODUCT_TABLE } = require('./product.model');

//Nombre Tabla bd
const ORDER_PRODUCT_TABLE = 'orders_products';

//Que queremos que se cree en la base de datos?
const OrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  orderId: {
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ORDER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    OnDelete: 'SET NULL',
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    OnDelete: 'SET NULL',
  },
};
//El Model tiene todos los modeles para hacer querys
class OrderProduct extends Model {
  static associate(models) {
    this.belongsTo(models.Product, { as: 'product' });
    this.belongsTo(models.Order, { as: 'order' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      moldelName: 'OrderProduct',
      timestamps: false,
    };
  }
}

module.exports = { ORDER_PRODUCT_TABLE, OrderProductSchema, OrderProduct };
