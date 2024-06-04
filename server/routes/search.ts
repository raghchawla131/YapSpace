import express from 'express';
import { searchUser } from '../controllers/search';

const router = express.Router();

router.post('/user', searchUser);

export default router;