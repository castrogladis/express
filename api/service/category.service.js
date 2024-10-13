const boom = require('@hapi/boom');
const pool = require('../../libs/postgres.pool');
const { models } = require('./../../libs/sequelize');

class CategoriesService {
  constructor() {}
  // generate() {
  //   this.categories.push({
  //     id: faker.string.uuid(),
  //     idCategories: faker.string.uuid(),
  //     name: faker.commerce.productName(),
  //     price: parseInt(faker.commerce.price(), 10),
  //     image: faker.image.url(),
  //   });
  // }

  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const categories = await models.Category.findAll();
    return categories;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products'],
    });
    if (!category) {
      throw boom.notFound('customer not found');
    }
    return category;
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

module.exports = CategoriesService;
