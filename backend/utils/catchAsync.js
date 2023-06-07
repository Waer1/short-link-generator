/**
 * Wraps an asynchronous function and catches any errors that occur.
 * Allows handling asynchronous errors in a middleware-friendly manner.
 * @param {Function} fn - The asynchronous function to be wrapped.
 * @returns {Function} - A wrapped function that catches errors and calls the next middleware.
 */
const catchAsync = (fn) => {
  return (req, res, next) => {
    // Execute the asynchronous function and catch any errors
    fn(req, res, next).catch(next);
  };
};

module.exports = catchAsync;
