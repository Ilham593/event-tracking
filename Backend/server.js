import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv"

dotenv.config()
connectDb()
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("hello word");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
