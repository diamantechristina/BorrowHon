import express from "express";

import { createHistory, getHistory } from "../controller/history.controller.js";

const router = express.Router();

router.get('/', getHistory)
router.post('/', createHistory)


export default router