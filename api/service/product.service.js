const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');
const { Op } = require('sequelize');

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

  async find(query) {
    const options = {
      include: ['category'],
      where: {},
    };

    const limit = parseInt(query.limit, 10);
    const offset = parseInt(query.offset, 10);

    if (!isNaN(limit) && !isNaN(offset)) {
      options.limit = limit;
      options.offset = offset;
    }

    const { price } = query;
    if (price) {
      options.where.price = price;
    }

    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    }

    const products = await models.Product.findAll(options);
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
