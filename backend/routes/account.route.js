import express from "express";

import  Account  from "../models/account.model.js";

import { getAccounts, createAccount, updateAccount, deleteAccount } from "../controller/account.controller.js";

const router = express.Router();

router.get('/', getAccounts)
router.post('/', createAccount)
router.put('/:id', updateAccount)
router.delete('/:id', deleteAccount)
router.post('/login', async (req, res) => {
    const { username, password } = req.body
    const account = await Account.findOne({ username })
    if (!account) {
        return res.status(400).json({ success: false, message: "Invalid credentials" })
    }
    const isValidPassword = await account.isValidPassword(password)
    if (!isValidPassword) {
        return res.status(400).json({ success: false, message: "Invalid credentials" })
    }
    const token = await account.generateTokien()
    return res.status(200).json({ success: true, token })
})

export default router