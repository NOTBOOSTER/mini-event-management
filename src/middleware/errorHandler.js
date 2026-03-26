import ApiResponse from "../utils/apiResponse.js";
import Logger from "../utils/logger.js";

const logger = new Logger("HANDLER");

const errorHandler = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  
  if (err.type === "entity.parse.failed") {
    return ApiResponse.error(res, "Invalid JSON in request body", 400);
  }

  if (err.isOperational) {
    return ApiResponse.error(res, err.message, err.statusCode);
  }

  return ApiResponse.error(res, "Something went wrong", 500);
};

export default errorHandler;
