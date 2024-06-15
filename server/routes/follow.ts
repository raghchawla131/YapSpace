import express from 'express';
import { followUser, isFollowing, unfollowUser } from '../controllers/follow';

const router = express.Router();

router.post('/following', followUser);
router.post('/unfollowing', unfollowUser);
router.post('/isFollowing', isFollowing);

export default router;