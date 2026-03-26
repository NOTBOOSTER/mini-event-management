import { Router } from "express";
import { createBooking } from "../controllers/bookingController.js";
import { validateCreateBooking } from "../middleware/validate.js";

const router = Router();

router.post("/", validateCreateBooking, createBooking);

export default router;
