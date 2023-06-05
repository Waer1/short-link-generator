const mongoose = require('mongoose');

const shortlinkSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true
  },
  ios: {
    primary: String,
    fallback: String
  },
  android: {
    primary: String,
    fallback: String
  },
  web: String
});

const Shortlink = mongoose.model('Shortlink', shortlinkSchema);

module.exports = Shortlink;
