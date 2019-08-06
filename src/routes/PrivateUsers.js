import express from 'express';

import { changePassword } from '../controllers/user';

const router = express.Router();

router.post('/changePassword', changePassword);

export default router;
