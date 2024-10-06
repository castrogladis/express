//Se encarga de enviar la conexion hacia los modelos y con esto hace el mapeo de los datos
const { User, UserSchema } = require('./user.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
}

module.exports = setupModels;
