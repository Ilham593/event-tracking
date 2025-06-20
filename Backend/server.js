import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";

dotenv.config();
connectDb();

const app = express();

const port = process.env.PORT || 3000

// middleware
app.use(express.json())

// routes
app.use("/api/auth", authRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
