const jwt = require("jsonwebtoken");
const appData = require("../App_Data");

const Auth = {};
Auth.authDoctor = (token, next) => {
  try {
    jwt.verify(token, appData.JsonSecretKey);
    next();
  } catch (err) {
    return { success: false, message: err.message };
  }
};

module.exports = Auth;
