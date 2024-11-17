import Account from "../models/account.model.js";
import mongoose from "mongoose";

// export const handleLogin = async (req, res) => {
//     const { username, password } = req.body;

//     const account = await Account.findOne({ username });
//     if (!account) {
//       return res.status(400).json({ success: false, message: "Invalid credentials" });
//     }
//     const isValidPassword = await account.isValidPassword(password);
//     if (!isValidPassword) {
//       return res.status(400).json({ success: false, message: "Invalid credentials" });
//     }
//     const token = await account.generateTokien()
//     return res.status(200).json({ success: true, token });
//   }

export const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({});
    res.status(200).json({ success: true, data: accounts });
  } catch (error) {
    console.log("Error in getting accounts: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createAccount = async (req, res) => {
  const account = req.body; // getting the data from frontend

  const existingAccount = await Account.findOne({ username: account.username });
  if (existingAccount) {
    return res.status(400).json({ message: "Username already taken!" });
  }
  const newAccount = new Account(account);

  try {
    await newAccount.save();
    res.status(201).json({ success: true, data: newAccount });
  } catch (error) {
    console.log("Error in creating account: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateAccount = async (req, res) => {
  const { id } = req.params;

  const account = req.body; // getting the data from frontend

  const existingAccount = await Account.findOne({
    username: account.username,
    _id: { $ne: id },
  });
  if (existingAccount) {
    return res.status(400).json({ message: "Username already taken!" });
  }

  try {
    const updatedAccount = await Account.findByIdAndUpdate(id, account, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedAccount });
  } catch (error) {
    console.log("Error in updating account: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteAccount = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "No account found" });
  }

  try {
    await Account.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    console.log("Error in deleting account: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
