const mongoose = require("mongoose");

/**
 * Shortlink Schema
 */
const shortlinkSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: [true, "Slug is a required field"],
    unique: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9]+$/.test(value);
      },
      message: "Slug must be a case-sensitive alphanumeric string",
      immutable: true, // Make the slug field read-only
    },
  },
  ios: {
    primary: {
      type: String,
      required: [true, "iOS primary is a required field"],
    },
    fallback: {
      type: String,
      required: [true, "iOS fallback is a required field"],
    },
  },
  android: {
    primary: {
      type: String,
      required: [true, "Android primary is a required field"],
    },
    fallback: {
      type: String,
      required: [true, "Android fallback is a required field"],
    },
  },
  web: {
    type: String,
    required: [true, "Web is a required field"],
  },
});

/**
 * Shortlink Model
 */
const Shortlink = mongoose.model("Shortlink", shortlinkSchema);

module.exports = Shortlink;
