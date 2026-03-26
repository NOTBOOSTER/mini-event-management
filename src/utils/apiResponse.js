class ApiResponse {
  static success(res, data = {}, message = "Success", statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static created(res, data = {}, message = "Created successfully") {
    return this.success(res, data, message, 201);
  }

  static notFound(res, message = "Resource not found") {
    return res.status(404).json({
      success: false,
      message,
    });
  }

  static error(res, message = "Something went wrong", statusCode = 500) {
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }

  static badRequest(res, message = "Bad request") {
    return res.status(400).json({
      success: false,
      message,
    });
  }
}

export default ApiResponse;
