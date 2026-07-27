const express = require('express');
const { productAdd, productUpdate } = require('../controller/products.controller');
const upload = require('../middleware/image.middleware');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
router.post('/add',authMiddleware,upload.single('image'), productAdd);
router.put('/update/:id', upload.single('image'), productUpdate);

module.exports = router;