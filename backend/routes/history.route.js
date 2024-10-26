import express from "express";

import { createHistory, getHistory } from "../controller/history.controller.js";

const router = express.Router();

router.post('/', createHistory)
router.get('/', getHistory)

export default router