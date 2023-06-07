const basicAuth = require("basic-auth");
const AppError = require("../utils/appError");

module.exports = (req, res, next) => {
  const credentials = basicAuth(req);

  if (
    !credentials ||
    credentials.name !== process.env.BASIC_AUTH_USERNAME ||
    credentials.pass !== process.env.BASIC_AUTH_PASSWORD
  ) {
    res.set("WWW-Authenticate", 'Basic realm="Authentication Required"');
    return next(new AppError("Unauthorized", 401));
  }

  next();
};
