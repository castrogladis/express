//Archivo que controla los endpoint para los prodcutos
const express = require('express');
const ProductsService = require('./../service/products.service'); //service
const validatorHandler = require('../middlewares/validator.handler'); //validator handler
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductsService(); //service

// router.get('/', (req, res) => {
//   res.json([
//     {
//       name: 'Producto 1',
//       price: 1000,
//     },
//     {
//       name: 'Producto 2',
//       price: 2000,
//     },
//   ]);
// });

/*router.get('/filter', (req, res) => {
  res.end('Soy un filter');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Producto 2',
    price: 2000,
  });
});

router.get('/:productsId/muebles/:mueblesId', (req, res) => {
  const { productsId, mueblesId } = req.params;
  res.json({
    productsId,
    mueblesId,
  });
});*/

//Faker http://localhost:3000/products?size=3 arroja tres productos
router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
}); //service

router.get('filter', (req, res) => {
  res.send('Soy un filter');
});

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'), //corre la vali de datos, si todo esta bien continua sig fun
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error); //si no esta bien, ejecutamos un md de tipo error
    }
  }
); //service

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json({ newProduct });
  }
);

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

module.exports = router;
