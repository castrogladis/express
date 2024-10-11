const { ValidationError } = require('sequelize');
const boom = require('@hapi/boom');

function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}

//crea un formato para devolverselo a nuestro cliente, si hay un error es el punto
function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

//Identificar si el error es tipo Boom
//Si sale el siguiente error:Cannot set headers after they are sent to the client es porq el if no se le coloco un else. sin el else, le indicamos que continue al siguiente middlewares.
function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload); //aqui finaliza si existe el error
  } else {
    next(err); //si no es tipo error boom, ejecuta el siguiente error,en este caso si no iría a error handler
  }
}

//envia un mejor formato para comunicar lo que de verdad se esta rompiendo
function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors,
    });
  }
  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler };
