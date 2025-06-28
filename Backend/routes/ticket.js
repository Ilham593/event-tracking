import { beliTiket, getMyTickets } from "../controllers/ticketController.js";
import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/",  authMiddleware, beliTiket)
router.get("/myticket", authMiddleware, getMyTickets)
export default router
