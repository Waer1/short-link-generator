/**
 * Custom Error class for handling application-specific errors.
 * Extends the built-in Error class.
 */
class AppError extends Error {
  /**
   * Create a new instance of AppError.
   * @param {string} message - The error message.
   * @param {number} statusCode - The HTTP status code associated with the error.
   */
  constructor(message, statusCode) {
    super(message);

    /**
     * The HTTP status code associated with the error.
     * @type {number}
     */
    this.statusCode = statusCode;

    /**
     * The status of the error (either 'fail' or 'error').
     * Determined based on the provided statusCode.
     * @type {string}
     */
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    /**
     * Indicates if the error is operational or a programming error.
     * Operational errors are handled separately from programming errors.
     * @type {boolean}
     */
    this.isOperational = true;

    // Capture the stack trace, excluding the constructor call
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
