const { createShortlink } = require("../controllers/shortlinkController");
const Shortlink = require("../models/shortlinkModel");

jest.mock("../models/shortlinkModel");

describe("createShortlink", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new shortlink", async () => {
    const mockRequest = {
      body: {
        ios: "ios1",
        android: "android1",
        web: "web1",
      },
    };

    const mockCreatedShortlink = {
      slug: "slug1",
      ios: "ios1",
      android: "android1",
      web: "web1",
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Shortlink.create.mockResolvedValue(mockCreatedShortlink);

    const next = jest.fn();

    await createShortlink(mockRequest, mockResponse, next);

    expect(Shortlink.create).toHaveBeenCalledWith({
      slug: expect.any(String),
      ios: "ios1",
      android: "android1",
      web: "web1",
    });
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "successful",
      slug: mockCreatedShortlink.slug,
      message: "Created successfully",
    });
  });

  it("should generate a random slug if not provided", async () => {
    const mockRequest = {
      body: {
        ios: "ios1",
        android: "android1",
        web: "web1",
      },
    };

    const mockCreatedShortlink = {
      slug: "generated_slug",
      ios: "ios1",
      android: "android1",
      web: "web1",
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Shortlink.create.mockResolvedValue(mockCreatedShortlink);

    const next = jest.fn();

    await createShortlink(mockRequest, mockResponse, next);

    expect(Shortlink.create).toHaveBeenCalledWith({
      slug: expect.any(String),
      ios: "ios1",
      android: "android1",
      web: "web1",
    });
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "successful",
      slug: mockCreatedShortlink.slug,
      message: "Created successfully",
    });
  });

  it("should handle error if slug already exists", async () => {
    const mockRequest = {
      body: {
        slug: "existing_slug",
        ios: "ios1",
        android: "android1",
        web: "web1",
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    Shortlink.findOne.mockResolvedValue(true); // Mock that slug already exists

    await createShortlink(mockRequest, mockResponse, next);

    expect(next).toHaveBeenCalledWith(
      expect.any(AppError) // Ensure that an AppError is passed to the next middleware
    );
    expect(next.mock.calls[0][0].message).toEqual("Slug already exists");
    expect(next.mock.calls[0][0].statusCode).toEqual(400);
  });
});
