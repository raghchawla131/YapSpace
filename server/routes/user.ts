import express from 'express';
import { info } from '../controllers/user';

const router = express.Router();

router.post('/info', info);

export default router;