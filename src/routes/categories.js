import express from 'express';

import { getById } from '../controllers/category';

const router = express.Router();

router.get('/', getById);

export default router;
