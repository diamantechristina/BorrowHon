import express from 'express';
import { getNotifications, createNotification, updateNotification, deleteNotification} from "../controller/notification.controller.js";

const router = express.Router();

router.get('/', getNotifications)
router.post('/', createNotification)
router.put('/:id', updateNotification)
router.delete('/:id', deleteNotification)

export default router