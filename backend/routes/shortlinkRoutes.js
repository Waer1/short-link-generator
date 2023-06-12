const express = require("express");
const {
  getAllShortlinks,
  createShortlink,
  updateShortlink,
  replaceShortlink,
  deleteShortlink,
  getShortlinksByUserType,
} = require("../controllers/shortlinkController");

const router = express.Router();

// Route: /api/shortlinks

/**
 * Route to get all shortlinks or create a new shortlink.
 */
router
  .route("/")
  .get(getAllShortlinks) // GET request to retrieve all shortlinks
  .post(createShortlink); // POST request to create a new shortlink

/**
 * Route to update or replace a specific shortlink.
 */
router
  .route("/:slug")
  .get(getShortlinksByUserType) // get single shortlinks
  .patch(updateShortlink) // PATCH request to update a shortlink
  .put(replaceShortlink) // PUT request to replace a shortlink
  .delete(deleteShortlink);

module.exports = router;
