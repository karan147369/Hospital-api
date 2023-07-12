const jwt = require("jsonwebtoken");
const appData = require("../App_Data");
const client = require("../model/dbConnect.js");

const Auth = {};
Auth.authDoctor = (res, token, next) => {
  try {
    jwt.verify(token, appData.JsonSecretKey);
    next();
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
// Auth.isPatientRegistered = async (res, id, next) => {
//
// };
module.exports = Auth;
