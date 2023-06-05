const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const basicAuthMiddleware = require("./middleware/basicAuthMiddleware");
const AppError = require("./utils/appError");
const shortlinkRoutes = require("./routes/shortlinkRoutes");

const app = express();

// Middleware
app.use(express.json());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(helmet());

// Basic Auth Middleware
app.use(basicAuthMiddleware);

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
