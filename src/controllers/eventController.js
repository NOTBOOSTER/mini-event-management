import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import { findUpcomingEvents, getEventById } from "../models/eventModel.js";
import { addEvent } from "../models/eventModel.js";
import { getBookingByConfirmationCode } from "../models/bookingModel.js";

export const listEvents = asyncHandler(async (req, res) => {
  const events = await findUpcomingEvents();
  ApiResponse.success(res, events, "Events fetched successfully");
});

export const createEvent = asyncHandler(async (req, res) => {
  const eventId = await addEvent(req.body);
  ApiResponse.created(res, { id: eventId }, "Event created successfully");
});

export const checkAttendance = asyncHandler(async (req, res) => {
  const eventExists = await getEventById(req.params.id);
  if (!eventExists) {
    return ApiResponse.notFound(res, "Event not found");
  }
  const getDetails = await getBookingByConfirmationCode(req.body.code);
  if (!getDetails) {
    return ApiResponse.badRequest(res, "Invalid confirmation code");
  }

  ApiResponse.success(res, getDetails, "Confirmation code is valid");
});
