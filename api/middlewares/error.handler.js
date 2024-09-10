function logErrors(err, req, res, next) {
  console.log('log errors');
  console.error(err);
  next(err);
}

//crea un formato para devolverselo a nuestro cliente, si hay un error es el punto
function errorHandler(err, req, res, next) {
  console.log('error Handler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

//Identificar si el error es tipo Boom
//Si sale el siguiente error:Cannot set headers after they are sent to the client es porq el if no se le coloco un else. sin el else, le iindicamos que continue al siguiente middlewares.
function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload); //aqui finaliza si existe el error
  } else {
    next(err); //si no es tipo error boom, ejecuta el siguiente error,en este caso si no iría a error handler
  }
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
