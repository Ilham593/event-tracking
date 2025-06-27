import {
  getEventDetail,
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/", getAllEvents);
router.get("/:id", getEventDetail);

// admin
router.post("/create", authMiddleware, isAdmin, createEvent);
router.put("/update/:id", authMiddleware, isAdmin, updateEvent);
router.delete("/delete/:id", authMiddleware, isAdmin, deleteEvent);

export default router;
