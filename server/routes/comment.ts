import express from 'express';
import { info } from '../controllers/user';

const router = express.Router();

router.post('/comment', info);

export default router;