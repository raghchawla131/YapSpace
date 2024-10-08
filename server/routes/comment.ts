import express from 'express';
import { info } from '../controllers/user';
import { addComment, getComments } from '../controllers/comment';

const router = express.Router();

router.post('/add_comment', addComment);
router.post('/get_comments', getComments);

export default router;