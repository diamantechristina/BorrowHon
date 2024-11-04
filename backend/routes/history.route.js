import express from "express";

import { createHistory, getHistory, updateHistory, deleteHistory } from "../controller/history.controller.js";

const router = express.Router();

router.get('/', getHistory)
router.post('/', createHistory)
router.put('/:id', updateHistory)
router.delete('/:id', deleteHistory)


export default router