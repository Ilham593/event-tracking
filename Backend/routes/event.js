import { getEventDetail, getAllEvents, createEvent, updateEvent, deleteEvent  } from "../controllers/eventController.js";
import express from "express"
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router()

router.get('/', getAllEvents)
router.get('/:id', getEventDetail)


// admin
router.post("/create", authMiddleware, createEvent)
router.put("/update/:id", authMiddleware, updateEvent)
router.delete("/delete/:id", authMiddleware, deleteEvent)

export default router

