const AppError = require("../utils/appError");
const Shortlink = require("../models/shortlinkModel");
const catchAsync = require("../utils/catchAsync");

// Get all shortlinks
exports.getAllShortlinks = catchAsync(async (req, res, next) => {
  // Builing Query
  const query = new APIFeatures(Shortlink.find({}), req.query)
    .filter()
    .sort()
    .limit()
    .fields()
    .paginate();

  const shortlinks = await query.query;
  res.status(200).json({
    status: "success",
    results: shortlinks.length,
    data: {
      shortlinks,
    },
  });
});

// Create a shortlink
exports.createShortlink = catchAsync(async (req, res, next) => {
  let { slug, ios, android, web } = req.body;

  // If slug is not provided, generate a random alphanumeric slug
  if (!slug) {
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const slugLength = 6; // this is the length of the string
    slug = Array.from(
      { length: slugLength },
      () => characters[Math.floor(Math.random() * characters.length)]
    ).join("");
  }

  // Check if slug already exists
  const existingShortlink = await Shortlink.findOne({ slug });
  if (existingShortlink) {
    return next(new AppError("Slug already exists", 400));
  }

  // Create the new shortlink
  const newShortlink = await Shortlink.create({ slug, ios, android, web });

  res.status(201).json({
    status: "successful",
    slug: newShortlink.slug,
    message: "Created successfully",
  });
});

// Update a shortlink
exports.updateShortlink = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const updates = req.body;
  const updatedShortLink = await Shortlink.findOneAndUpdate({ slug }, updates, {
    new: true,
    runValidators: true,
  });

  if (!updatedShortLink) {
    return next(new AppError("No ShortLink found with that Slug", 400));
  }

  res.status(200).json({
    status: "success",
    message: "Updated successfully",
    data: {
      updatedShortLink,
    },
  });
});

// replace the ShortLink
exports.replaceShortlink = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const updates = req.body;
  updates.slug = slug;

  try {
    const updatedShortlink = await Shortlink.findOneAndReplace(
      { slug },
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedShortlink) {
      return res.status(404).json({ message: "Shortlink not found" });
    }

    res.status(200).json({
      message: "Shortlink updated successfully",
      shortlink: updatedShortlink,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
