import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import bookRoutes from "./routes/book.route.js";
import accountRoutes from "./routes/account.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json()); // for parsing application/json

app.use("/api/books", bookRoutes)

app.use("/api/accounts", accountRoutes)
app.use("/api/accounts/login", accountRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log('Server running on port 3000')
});
