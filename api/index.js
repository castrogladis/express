const express = require('express');
const cors = require('cors'); //cors
const routerApi = require('./routes');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler'); //error handle

//require('express-async-errors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //este es un middleware

const whitelist = ['http://localhost:8080', 'https://myapp.co']; //origenes en los cuales si quiero recibir peticiones
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  },
};
app.use(cors(options)); //cors, habilitado a cualquier dominio, aceptando cualquier origen

app.get('/api', (req, res) => {
  res.send('Hola mi server en express');
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler); //detecta si es un error tipo orm
app.use(boomErrorHandler);
app.use(errorHandler); //finalmente si nadie capturo el error, tenemos un error handler

app.listen(port, () => {
  console.log('Mi port ' + port);
});

//http://127.0.0.3:5500', 'https://myapp.co
