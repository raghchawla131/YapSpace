import express from 'express';
import { removeRepostYap, repostYap } from '../controllers/repost';

const router = express.Router();

router.post('/repost_yap', repostYap);
router.post('/remove_repost_yap', removeRepostYap);

export default router;