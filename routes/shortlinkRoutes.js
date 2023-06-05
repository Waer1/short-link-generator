const express = require("express");
const {
  getAllShortlinks,
  createShortlink,
  updateShortlink,
  replaceShortlink,
} = require("../controllers/shortlinkController");

const router = express.Router();

router.route("/").get(getAllShortlinks).post(createShortlink);

router.route("/:slug").patch(updateShortlink).put(replaceShortlink);

module.exports = router;
