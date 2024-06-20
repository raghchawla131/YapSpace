import express from 'express';
import { info } from '../controllers/user';
import { likeYap, unlikeYap } from '../controllers/like';

const router = express.Router();

router.post('/like_yap', likeYap);
router.post('/unlike_yap', unlikeYap);

export default router;