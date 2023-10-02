const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const checkAuth = require('../middleware/adminAuth'); // Middleware for checking user authentication and role

// Add a new product (Only accessible by admin)
router.post('/', checkAuth(['Admin']), productController.addProduct);

// Update a product Only accessible by admin 
router.patch('/:id', checkAuth(['Admin']), productController.updateProduct);

// Delete a product (Only accessible by admin)
router.delete('/:id', checkAuth(['Admin']), productController.deleteProduct);

//Get product list
router.get('/', productController.getProducts);


module.exports = router;
