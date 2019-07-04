import * as ticketController from '../controllers/ticket';

const express = require('express');

const router = express.Router();


router.post('/', ticketController.create);
router.get('/:ticketId', ticketController.getById);

module.exports = router;
