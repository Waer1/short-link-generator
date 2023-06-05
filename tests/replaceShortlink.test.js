const { replaceShortlink } = require("../controllers/shortlinkController");
const Shortlink = require("../models/shortlinkModel");

jest.mock("../models/shortlinkModel");

describe("replaceShortlink", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should replace an existing shortlink", async () => {
    const mockRequest = {
      params: {
        slug: "slug1",
      },
      body: {
        ios: "ios2",
        android: "android2",
        web: "web2",
      },
    };

    const mockUpdatedShortlink = {
      slug: "slug1",
      ios: "ios2",
      android: "android2",
      web: "web2",
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    Shortlink.findOneAndReplace.mockResolvedValue(mockUpdatedShortlink);

    await replaceShortlink(mockRequest, mockResponse, next);

    expect(Shortlink.findOneAndReplace).toHaveBeenCalledWith(
      { slug: "slug1" },
      {
        slug: "slug1",
        ios: "ios2",
        android: "android2",
        web: "web2",
      },
      {
        new: true,
        runValidators: true,
      }
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "success",
      message: "Replaced successfully",
      data: {
        replacedShortLink: mockUpdatedShortlink,
      },
    });
  });

  it("should handle error if no shortlink found with the slug", async () => {
    const mockRequest = {
      params: {
        slug: "non_existing_slug",
      },
      body: {
        ios: "ios2",
        android: "android2",
        web: "web2",
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    Shortlink.findOneAndReplace.mockResolvedValue(null); // Mock that no shortlink found

    await replaceShortlink(mockRequest, mockResponse, next);

    expect(next).toHaveBeenCalledWith(
      expect.any(AppError) // Ensure that an AppError is passed to the next middleware
    );
    expect(next.mock.calls[0][0].message).toEqual("No ShortLink found with that Slug");
    expect(next.mock.calls[0][0].statusCode).toEqual(400);
  });
});
