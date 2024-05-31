import express from "express";
import { createYap } from "../controllers/yap";

const router = express.Router();

router.post('/create_yap', createYap);

export default router;