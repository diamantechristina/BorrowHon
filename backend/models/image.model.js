import mongoose from "mongoose";
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// const imageSchema = new mongoose.Schema({
    // name: {