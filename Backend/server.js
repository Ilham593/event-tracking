import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import eventRouter from "./routes/event.js"
import ticketRouter from "./routes/ticket.js"
import profileRouter from "./routes/profile.js"
dotenv.config();
connectDb();

const app = express();

const port = process.env.PORT || 3000

// middleware
app.use(express.json())

// routes
app.use("/api/auth", authRouter);
app.use("/api/events", eventRouter)
app.use("/api/ticket", ticketRouter)
app.use("/api/profile", profileRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
