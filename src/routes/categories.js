const express = require('express');

const router = express.Router();
const categoriesController = require('../controllers/category');

router.get('/', categoriesController.getById);

module.exports = router;
