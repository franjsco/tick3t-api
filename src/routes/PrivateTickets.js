import express from 'express';
import { getAll, updateById, deleteById } from '../controllers/ticket';

const router = express.Router();

router.get('/', getAll);
router.put('/:ticketId', updateById);
router.delete('/:ticketId', deleteById);

export default router;
