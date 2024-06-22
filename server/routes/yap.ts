import express from "express";
import { createYap, getHomeYaps, getProfileYaps } from "../controllers/yap";

const router = express.Router();

router.post('/create_yap', createYap);
router.post('/get_yaps', getHomeYaps);
router.post('/get_profile_yaps', getProfileYaps);

export default router;