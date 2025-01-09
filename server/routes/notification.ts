import express from "express";
import { getNotifications, createNotification } from "../controllers/notification";

const router = express.Router();

router.post('/getNotifications', getNotifications);
router.post('/createNotifications', createNotification);

export default router;