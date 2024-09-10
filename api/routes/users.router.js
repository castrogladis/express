const express = require('express');

const user = express.Router();

//Ejemplo query http://localhost:3000/users?limit=10&offset=200
user.get('/', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send('No hay parametros');
  }
});
//como son opcionales se hace una validación

module.exports = user;
