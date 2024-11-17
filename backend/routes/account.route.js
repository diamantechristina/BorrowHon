import express from "express";

import  Account  from "../models/account.model.js";

import { getAccounts, createAccount, updateAccount, deleteAccount } from "../controller/account.controller.js";

const router = express.Router();

router.get('/', getAccounts)
router.post('/', createAccount)
router.put('/:id', updateAccount)
router.delete('/:id', deleteAccount)

export default router