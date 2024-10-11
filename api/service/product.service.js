const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');

class ProductsService {
  constructor() {
    this.generate();
  }
  generate() {
    // const limit = 100;
    // for (let i = 0; i < limit; i++) {
    //   this.products.push({
    //     id: faker.string.uuid(),
    //     name: faker.commerce.productName(),
    //     price: parseInt(faker.commerce.price(), 10),
    //     image: faker.image.url(),
    //     isBlock: faker.datatype.boolean(),
    //   });
    // }
  }
  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find() {
    const products = await models.Product.findAll({
      include: ['category'],
    });
    return products;
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = ProductsService;
