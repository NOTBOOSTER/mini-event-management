import { z } from "zod";
import ApiError from "../utils/apiError.js";

const positiveInt = (fieldName) =>
  z
    .number({
      required_error: `${fieldName} is required`,
      invalid_type_error: `${fieldName} must be a number`,
    })
    .int(`${fieldName} must be a whole number`)
    .positive(`${fieldName} must be greater than 0`);

const createEventSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title cannot be empty")
    .max(255, "Title cannot exceed 255 characters"),

  description: z
    .string()
    .max(1000, "Description cannot exceed 1000 characters")
    .optional(),

  date: z
    .string({ required_error: "Date is required" })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format. Use ISO format: 2026-4-01T10:00:00Z",
    })
    .refine((val) => new Date(val) > new Date(), {
      message: "Event date must be in the future",
    }),

  total_capacity: z
    .number({ required_error: "Capacity is required" })
    .int("Capacity must be a whole number")
    .positive("Capacity must be greater than 0")
    .max(100000, "Capacity cannot exceed 100,000"),
});

const createUserSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name cannot be empty")
    .max(100, "Name cannot exceed 100 characters"),
  email: z
    .email("Invalid email format")
    .max(255, "Email cannot exceed 255 characters"),
});

// booking Schema
const createBookingSchema = z.object({
  user_id: positiveInt("user_id"),
  event_id: positiveInt("event_id"),
  tickets: z
    .number({ required_error: "Tickets is required" })
    .int("Tickets must be a whole number")
    .positive("Tickets must be greater than 0")
    .max(1000, "Cannot book more than 1000 tickets at once"),
});

const checkAttendanceSchema = z.object({
  code: z
    .string({ required_error: "Confirmation code is required" })
    .min(1, "Confirmation code cannot be empty")
    .max(16, "Invalid confirmation code"),
});

const userIdParamSchema = z.object({
  id: z
    .string()
    .refine((val) => Number.isInteger(Number(val)) && Number(val) > 0, {
      message: "User ID must be a positive integer",
    }),
});

const eventIdParamSchema = z.object({
  id: z
    .string()
    .refine((val) => Number.isInteger(Number(val)) && Number(val) > 0, {
      message: "Event ID must be a positive integer",
    }),
});

const validateBody = (schema) => (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Request body cannot be empty"));
  }
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const message = result.error.issues[0]?.message || "Invalid input";
    return next(new ApiError(400, message));
  }
  req.body = result.data;
  next();
};

const validateParams = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.params);
  if (!result.success) {
    const message = result.error.issues[0]?.message || "Invalid params";
    return next(new ApiError(400, message));
  }
  next();
};

export const validateCreateEvent = validateBody(createEventSchema);
export const validateCreateBooking = validateBody(createBookingSchema);
export const validateAttendanceCode = validateBody(checkAttendanceSchema);
export const validateCreateUser = validateBody(createUserSchema);
export const validateUserIdParam = validateParams(userIdParamSchema);
export const validateEventIdParam = validateParams(eventIdParamSchema);
