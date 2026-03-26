import { Router } from "express";
import { addAttendance, createEvent, listEvents } from "../controllers/eventController.js";
import { validateAttendanceCode, validateCreateEvent, validateEventIdParam } from "../middleware/validate.js";

const router = Router();

router.get("/", listEvents);
router.post("/", validateCreateEvent, createEvent);
router.post("/:id/attendance", validateEventIdParam, validateAttendanceCode, addAttendance);

export default router;
