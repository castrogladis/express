const express = require('express');
const CategoriesService = require('./../service/categories.service');

const categories = express.Router();
const service = new CategoriesService();

categories.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  const category = service.findOne(categoryId, productId);
  if (category) {
    res.json(category);
  } else {
    res.status(404).json({ message: 'RPoduct not found in this category' });
  }
});

module.exports = categories;
