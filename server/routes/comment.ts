import express from 'express';
import { info } from '../controllers/user';
import { addComment, getComments } from '../controllers/comment';

const router = express.Router();

router.post('/add_comment', addComment);
router.get('/get_comments/:yap_id', getComments);

export default router;