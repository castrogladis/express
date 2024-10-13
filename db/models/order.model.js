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
};
// type:DataTypes.INTEGER,unique:true,references:{model:USER_TABLE,key:'id'},
//  onUpdate:'CASCADE',onDelete:'SET NULL'}}

//El Model tieNe todos los modeles para hacer querys
class Order extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, {
      as: 'customer',
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
