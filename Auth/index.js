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
Auth.isPatientRegistered = async (res, id, next) => {
  const check = await client
    .db("Hospital")
    .collection("patients")
    .findOne({ phoneNo: id });
  if (check === null)
    res.json({
      success: false,
      message:
        "Patient doesn't exits! Please register the patient first before generating report.",
    });
  else next();
};
module.exports = Auth;
