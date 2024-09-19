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

//Faker http://localhost:3000/products?size=3 arroja tres productos
router.get('/', async (req, res) => {
  try {
    const products = await service.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
}); //service

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
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json({ newProduct });
    } catch (error) {
      next(error);
    }
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

router.delete(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const rta = await service.delete(id);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
