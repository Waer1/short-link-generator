const dotenv = require("dotenv");

dotenv.config({
  path: "./config.env",
});

const mongoose = require("mongoose");
const app = require("./app");

var DB_URL = process.env.DATABASE_URL.replace(
  "<USER>",
  process.env.DATABASE_USER
);
DB_URL = DB_URL.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
DB_URL = DB_URL.replace("<HOST>", process.env.DATABASE_HOST);

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Failed to connect to the database:", err);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
