const express = require('express');
const { productAdd } = require('../controller/products.controller');
const upload = require('../middleware/image.middleware');
const router = express.Router();
router.post('/add',upload.single('image'), productAdd);

module.exports = router;