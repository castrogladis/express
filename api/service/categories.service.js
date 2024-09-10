const { faker } = require('@faker-js/faker');

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

  create() {}

  find() {
    return this.categories;
  }

  findOne(idCategories, productsId) {
    return this.categories.find(
      (item) => item.idCategories === idCategories && item.id === productsId
    );
  }

  update() {}

  delete() {}
}

module.exports = CategoriesService;
