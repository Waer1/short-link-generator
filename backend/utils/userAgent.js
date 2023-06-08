const UserType = {
  DESKTOP: "desktop",
  ANDROID: "android",
  IOS: "ios",
};

module.exports = UserType;

function getUserType(userAgent) {
  if (userAgent.includes("Android")) {
    return UserType.ANDROID;
  } else if (userAgent.includes("iPhone") || userAgent.includes("iPad")) {
    return UserType.IOS;
  } else {
    return UserType.DESKTOP;
  }
}

module.exports = getUserType;
