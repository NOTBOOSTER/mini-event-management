import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import {
  getRemainingTickets,
  updateRemainingTickets,
} from "../models/eventModel.js";
import generateConfirmationCode from "../utils/codeGenrator.js";
import { addBooking, getBookingByUserId } from "../models/bookingModel.js";

export const createBooking = asyncHandler(async (req, res) => {
  const remaning_tickets = await getRemainingTickets(req.body.event_id);
  if (remaning_tickets === undefined) {
    return ApiResponse.notFound(res, "Event not found");
  }
  if (remaning_tickets === 0) {
    return ApiResponse.badRequest(res, "No tickets available");
  } else if (remaning_tickets < req.body.tickets) {
    return ApiResponse.badRequest(
      res,
      `Not enough tickets available. Only ${remaning_tickets} left`
    );
  }
  const code = generateConfirmationCode();
  await updateRemainingTickets(req.body.event_id, req.body.tickets);
  const eventdata = await addBooking({ ...req.body, confirmation_code: code });
  ApiResponse.created(res, eventdata, "Booking created successfully");
});

export const getUserBookings = asyncHandler(async (req, res) => {
  const userExists = await getBookingByUserId(req.params.id);
  if (userExists.length === 0) {
    return ApiResponse.notFound(res, "User not found");
  }
  const bookings = await getBookingByUserId(req.params.id);
  ApiResponse.success(res, bookings, "Bookings fetched successfully");
});
