const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cors = require("cors"); // Import the cors package
const basicAuthMiddleware = require("./middleware/basicAuthMiddleware");
const AppError = require("./utils/appError");
const shortlinkRoutes = require("./routes/shortlinkRoutes");
const getUserType = require("./utils/userAgentUtils");

const app = express();

// Middleware

// Body parser, reading data from the request body into req.body
app.use(express.json({ limit: "50kb" }));
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
} else {
  // Basic Auth Middleware
  app.use(basicAuthMiddleware);
}
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false,
  })
); // use security middleware for reciveing requests
app.use(cors()); // Add the cors middleware

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS (Cross-Site Scripting) attacks
app.use(xss()); // Prevent execution of dangerous HTML and JavaScript code in the request

const userAgent = req.headers["user-agent"];
const userType = getUserType(userAgent);

console.log(userType);

// Routes
app.use("/api/v1/shortlinks", shortlinkRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message || "Internal Server Error",
  });
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!!!`, 404));
});

module.exports = app;
