const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({
  path: "./config.env",
});

const { getAllShortlinks } = require("../controllers/shortlinkController");
const Shortlink = require("../models/shortlinkModel");
const AppError = require("../utils/appError");

jest.mock("../models/shortlinkModel");

describe("getAllShortlinks", () => {
  let connection;

  beforeAll(async () => {
    var DB_URL = process.env.DATABASE_URL.replace(
      "<USER>",
      process.env.DATABASE_USER
    );
    DB_URL = DB_URL.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
    DB_URL = DB_URL.replace("<HOST>", process.env.DATABASE_HOST);

    connection = await mongoose
      .connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to the database!");
      })
      .catch((err) => {
        console.log("Failed to connect to the database:", err);
        throw err; // Throw the error to fail the test if the connection fails
      });
  }, 50000);

  afterAll(async () => {
    await connection.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should retrieve all shortlinks", async () => {
    const mockShortlinks = [
      { slug: "slug1", ios: "ios1", android: "android1", web: "web1" },
      { slug: "slug2", ios: "ios2", android: "android2", web: "web2" },
    ];

    Shortlink.find.mockResolvedValue(mockShortlinks);

    const req = {};
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await getAllShortlinks(req, res, next);

    expect(Shortlink.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      results: mockShortlinks.length,
      data: {
        shortlinks: mockShortlinks,
      },
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should handle errors and pass them to the error handling middleware", async () => {
    const errorMessage = "Database connection error";
    const mockError = new AppError(errorMessage, 500);
    Shortlink.find.mockRejectedValue(mockError);

    const req = {};
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await getAllShortlinks(req, res, next).catch((err) => {
      expect(Shortlink.find).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(err);
    });
  });
});
