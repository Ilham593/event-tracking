import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { limiter } from "./middlewares/rateLimitter.js";
import morgan from "morgan";
import authRouter from "./routes/auth.js";
import eventRouter from "./routes/event.js";
import profileRouter from "./routes/profile.js";

dotenv.config();
connectDb();

const app = express();
const port = process.env.PORT || 3000;

// middleware global
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
// rate limiter unutk mencegar ddos
app.use(limiter);

// routes
app.use("/api", authRouter);
app.use("/api/events", eventRouter);

app.use("/api/profile", profileRouter);

// Middleware untuk menangani route yang tidak ditemukan (404)
app.use((req, res) => {
  res.status(404).json({ msg: "Route tidak ditemukan" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global Error:", err.stack);
  res.status(500).json({ msg: "Kesalahan server", error: err.message });
});
