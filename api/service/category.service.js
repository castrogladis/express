const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class CategoriesService {
  constructor() {
    this.categories = [];
    this.generate();
  }
  generate() {
    this.categories.push({
      id: faker.string.uuid(),
      idCategories: faker.string.uuid(),
      name: faker.commerce.productName(),
      //price: parseInt(faker.commerce.price(), 10),
      //image: faker.image.url(),
    });
  }

  async create(data) {
    return data;
  }

  async find() {
    return [];
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

module.exports = CategoriesService;
