const mongoose = require("mongoose");

/**
 * Shortlink Schema
 */
const shortlinkSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: false,
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
      required: true,
    },
    fallback: {
      type: String,
      required: true,
    },
  },
  android: {
    primary: {
      type: String,
      required: true,
    },
    fallback: {
      type: String,
      required: true,
    },
  },
  web: {
    type: String,
    required: true,
  },
});

/**
 * Shortlink Model
 */
const Shortlink = mongoose.model("Shortlink", shortlinkSchema);

module.exports = Shortlink;
