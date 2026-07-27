const express = require('express');
const { productAdd, productUpdate, productDelete } = require('../controller/products.controller');
const upload = require('../middleware/image.middleware');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
router.post('/add', authMiddleware, upload.single('image'), productAdd);
router.put('/update/:id', authMiddleware, upload.single('image'), productUpdate);
router.delete('/delete/:id', productDelete);

module.exports = router;