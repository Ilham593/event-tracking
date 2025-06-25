import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors"
import helmet from "helmet"
import rateLimit from "express-rate-limit";


import authRouter from "./routes/auth.js";
import eventRouter from "./routes/event.js"
import ticketRouter from "./routes/ticket.js"
import profileRouter from "./routes/profile.js"

dotenv.config();
connectDb();

const app = express();
const port = process.env.PORT || 3000

// middleware global
app.use(helmet())
app.use(cors())
app.use(express.json())

// rate limiter unutk mencegar ddos
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "terlalu banyak request dari ip ini,coba lagi nanti"
})

app.use(limiter)



// routes
app.use("/api/auth", authRouter);
app.use("/api/events", eventRouter)
app.use("/api/ticket", ticketRouter)
app.use("/api/profile", profileRouter)

// Middleware untuk menangani route yang tidak ditemukan (404)
app.use((req, res) => {
  res.status(404).json({ msg: "Route tidak ditemukan" });
});

app.listen(port, () => {
  
  console.log(`Example app listening on port ${port}`);
});
