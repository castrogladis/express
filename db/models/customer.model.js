const { type } = require('os');
const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');

//Nombre Tabla bd
const CUSTOMER_TABLE = 'customers';

//Que queremos que se cree en la base de datos?
const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },

  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      //es un objeto y le diremos a que tabla va relacionada
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    OnDelete: 'SET NULL',
  },
};
// type:DataTypes.INTEGER,unique:true,references:{model:USER_TABLE,key:'id'},
//  onUpdate:'CASCADE',onDelete:'SET NULL'}}

//El Model tieNe todos los modeles para hacer querys
class Customer extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' });
    this.hasMany(models.Order, { as: 'order', foreignKey: 'customerId' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      moldelName: 'Customer',
      timestamps: false,
    };
  }
}

module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer };
