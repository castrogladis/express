const express = require('express');
const cors = require('cors'); //cors
const routerApi = require('./routes');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler'); //error handle

//require('express-async-errors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //este es un middleware

const whitelist = ['http://127.0.0.1:5500', 'https://myapp.co']; //origenes en los cuales si quiero recibir peticiones
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

app.use(logErrors); //error handle
app.use(boomErrorHandler);
app.use(errorHandler); //error handle

app.listen(port, () => {
  console.log('Mi port ' + port);
});

// app.get('/contacto', (req, res) => {
//   res.send('Llamar al siguiente numero 33-4567-8765');
// });

// // app.get('/products', (req, res) => {
// //   res.json([
// //     {
// //       name: 'Producto 1',
// //       price: 1000,
// //     },
// //     {
// //       name: 'Producto 2',
// //       price: 2000,
// //     },
// //   ]);
// // });
// //obtener endpoint con un parametro
// app.get('/products/:id', (req, res) => {
//   const { id } = req.params;
//   res.json({
//     id,
//     name: 'Producto 2',
//     price: 2000,
//   });
// });

// app.get('/products/filter', (req, res) => {
//   res.end('Soy un filter');
// });
// //aqui recogemos el id, con la propiedad params. desestructuracion, desde los parametros, solo me interesa el id, el nombre que se coloca despues del : y luego se devuelve e nel json con el nombre {id}

// //obtener endpoint con dos parametros

// app.get('/categories/:categoryId/products/:productsId', (req, res) => {
//   const { categoryId, productsId } = req.params;
//   res.json({
//     categoryId,
//     productsId,
//   });
// });

// app.get('/products/:productsId/muebles/:mueblesId', (req, res) => {
//   const { productsId, mueblesId } = req.params;
//   res.json({
//     productsId,
//     mueblesId,
//   });
// });

//Ejemplo query http://localhost:3000/users?limit=10&offset=200
// app.get('/users', (req, res) => {
//   const { limit, offset } = req.query;
//   if (limit && offset) {
//     res.json({
//       limit,
//       offset,
//     });
//   } else {
//     res.send('No hay parametros');
//   }
// });
//como son opcionales se hace una validación

// //Faker http://localhost:3000/products?size=3 arroja tres productos
// app.get('/products', (req, res) => {
//   const products = [];
//   const { size } = req.query;
//   const limit = size || 10;

//   for (let i = 0; i < limit; i++) {
//     products.push({
//       name: faker.commerce.productName(),
//       price: parseInt(faker.commerce.price(), 10),
//       image: faker.image.url(),
//     });
//   }
//   res.json(products);
// });

//los log no deberian ir a producción ¿? investigar
//http://localhost:3000/products: ahi se muestra el resultado de lo creado
