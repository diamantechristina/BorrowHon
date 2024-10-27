import express from "express";

import { getLogs, createLog } from "../controller/log.controller.js";

const router = express.Router();

router.get('/', getLog)
router.post('/', createLog)

export default router