import { addUser, findUserByEmail } from "../models/userModel.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createUser = asyncHandler(async (req, res) => {
  const existingUser = await findUserByEmail(req.body.email);
  if (existingUser) {
    return ApiResponse.badRequest(res, "Email already exists");
  }
  const user = await addUser(req.body);
  ApiResponse.created(res, user, "User created successfully");
});
