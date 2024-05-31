import express from "express";
import { createYap, getYaps } from "../controllers/yap";

const router = express.Router();

router.post('/create_yap', createYap);
router.post('/get_yaps', getYaps);

export default router;