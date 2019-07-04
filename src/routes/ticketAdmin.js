const express = require('express');

const router = express.Router();
const ticketController = require('../controllers/ticketAdmin');

router.get('/', ticketController.getAll);
router.put('/:ticketId', ticketController.updateById);
router.delete('/:ticketId', ticketController.deleteById);

module.exports = router;
