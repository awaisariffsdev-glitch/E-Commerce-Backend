const express = require('express');
const { productAdd } = require('../controller/products.controller');
const router = express.Router();
router.post('/add', productAdd);

module.exports = router;