import { Router } from "express";
import { createUser } from "../controllers/userController.js";
import {
  validateCreateUser,
  validateUserIdParam,
} from "../middleware/validate.js";
import { getUserBookings } from "../controllers/bookingController.js";

const router = Router();

router.post("/create", validateCreateUser, createUser);
router.get("/:id/bookings", validateUserIdParam, getUserBookings);

export default router;
