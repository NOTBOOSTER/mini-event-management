import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import { findUpcomingEvents, getEventById } from "../models/eventModel.js";
import { addEvent } from "../models/eventModel.js";
import { getBookingByConfirmationCode } from "../models/bookingModel.js";
import { checkAttendance, insertAttendance } from "../models/attendanceModel.js";

export const listEvents = asyncHandler(async (req, res) => {
  const events = await findUpcomingEvents();
  ApiResponse.success(res, events, "Events fetched successfully");
});

export const createEvent = asyncHandler(async (req, res) => {
  const eventId = await addEvent(req.body);
  ApiResponse.created(res, { id: eventId }, "Event created successfully");
});

export const addAttendance = asyncHandler(async (req, res) => {
  const eventExists = await getEventById(req.params.id);
  if (!eventExists) {
    return ApiResponse.notFound(res, "Event not found");
  }
  const getDetails = await getBookingByConfirmationCode(req.body.code);
  if (!getDetails) {
    return ApiResponse.badRequest(res, "Invalid confirmation code");
  }

  const eventDate = new Date(getDetails.event_date);
  const currentDate = new Date();
  if (currentDate < eventDate) {
    return ApiResponse.badRequest(res, "Event has not started yet");
  }

  if (currentDate > eventDate) {
    return ApiResponse.badRequest(res, "Event has already ended");
  }

  const isAlreadyCheckedIn = await checkAttendance(getDetails.id);
  if (isAlreadyCheckedIn) {
    return ApiResponse.badRequest(res, "Attendance already confirmed for this code");
  }

  const attendance = await insertAttendance({
    booking_id: getDetails.id,
    user_id: getDetails.user_id,
    event_id: parseInt(req.params.id),
  });

  ApiResponse.success(res, attendance, "Attendance logged successfully");
});
