import express from 'express';
import { create, getById } from '../controllers/ticket';

const router = express.Router();

router.post('/', create);
router.get('/:ticketId', getById);

export default router;
