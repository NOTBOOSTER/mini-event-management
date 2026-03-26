import { Router } from "express";
import eventRoute from "./eventRoute.js";
import bookingRoute from "./bookingRoute.js";
import userRoute from "./userRoute.js";

const router = Router();

router.use("/events", eventRoute);
router.use("/bookings", bookingRoute);
router.use("/users", userRoute);

export default router;
