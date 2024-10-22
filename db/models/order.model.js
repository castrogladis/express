const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model');

//Nombre Tabla bd
const ORDER_TABLE = 'orders';

//Que queremos que se cree en la base de datos?
const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    OnDelete: 'SET NULL',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  total: {
    type: DataTypes.VIRTUAL,
    //como vamos a obtener o calcular este campo
    get() {
      if (this.items.length > 0) {
        //items es la manera de como haya llamado la asociacion abajo
        return this.items.reduce((total, item) => {
          return total + item.price * item.OrderProduct.amount;
        }, 0);
      }
      return 0;
    },
  },
};

//El Model tiene todos los modelos para hacer querys
class Order extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, { as: 'customer' });
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct, //tabla que hace el join de las dos tablas
      foreignKey: 'orderId',
      otherKey: 'productId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      moldelName: 'Order',
      timestamps: false,
    };
  }
}

module.exports = { ORDER_TABLE, OrderSchema, Order };
