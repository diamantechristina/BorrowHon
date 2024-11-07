import express from "express";

import { getLog, createLog, updateLog } from "../controller/log.controller.js";

const router = express.Router();

router.get('/', getLog)
router.post('/', createLog)
router.put('/:id',updateLog)

export default router