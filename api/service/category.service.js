const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const pool = require('../../libs/postgres.pool');

class CategoriesService {
  constructor() {
    this.categories = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
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
    const query = 'SELECT * FROM tasks';
    const rta = await this.pool.query(query);
    return rta.rows;
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
