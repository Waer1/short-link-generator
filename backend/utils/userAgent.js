// Define the enum for user types
const UserType = {
  DESKTOP: "desktop",
  ANDROID: "android",
  IOS: "ios",
};

// Define the function to get the user type based on the userAgent
function getUserType(userAgent) {
  if (userAgent.includes("Android")) {
    return UserType.ANDROID;
  } else if (userAgent.includes("iPhone") || userAgent.includes("iPad")) {
    return UserType.IOS;
  } else {
    return UserType.DESKTOP;
  }
}

// Export the function and the enum
module.exports = {
  UserType,
  getUserType,
};
