const boom = require('@hapi/boom');

//validacion de datos que nos envian desde el lado del cliente

function validatorHandler(schema, property) {
  //property: donde validara la información
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error)); //aqui los middleware de tipo error lo procesan
    }
    next(); //si no hay error, siga para crear el servicio en memoria o en la bd, sino lo envia a los Mi de tipo error
  };
}

module.exports = validatorHandler;
//no recibimos directamente el req,res,next, lo hacemos asi para recibir el squema que voy a validr y la propiedad, para que sea dinamico
