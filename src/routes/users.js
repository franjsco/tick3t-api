import express from 'express';

import { authenticate } from '../controllers/user';

const router = express.Router();

router.post('/login', authenticate);

export default router;
