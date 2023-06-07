const AppError = require("../utils/appError");

/**
 * Send error response in development environment
 * @param {Object} err - Error object
 * @param {Object} res - Response object
 */
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    err: err,
    message: err.message,
    stack: err.stack,
  });
};

/**
 * Send error response in production environment
 * @param {Object} err - Error object
 * @param {Object} res - Response object
 */
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Log the error
    console.error("ERROR 💥", err);

    // Send a generic error message
    res.status(500).json({
      status: "error",
      message: "Something went very wrong! 💥💥💥",
    });
  }
};

/**
 * Handle CastError from MongoDB
 * @param {Object} err - CastError object
 * @param {Object} res - Response object
 * @param {Object} next - Next middleware function
 * @returns {Object} - AppError object
 */
const handleCastErrorDB = (err, res, next) => {
  return new AppError(
    `Invalid data provided in the field ${err.path} with value ${err.value}.`,
    400
  );
};

/**
 * Handle database validation errors
 * @param {Object} err - ValidationError object
 * @param {Object} res - Response object
 * @param {Object} next - Next middleware function
 * @returns {Object} - AppError object
 */
const handleDBerrors = (err, res, next) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

/**
 * Global error handler middleware
 * @param {Object} err - Error object
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Object} next - Next middleware function
 */
exports.globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 404;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (err.name === "CastError") error = handleCastErrorDB(err, res);
    else if (err.name === "ValidationError") error = handleDBerrors(err, res);
    sendErrorProd(error, res);
  }
};
