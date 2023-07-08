const client = require("../model/dbConnect.js");
const jwt = require("jsonwebtoken");
const appData = require("../App_Data");
const controller = {};

controller.verifyDoctor = async function (username, password) {
  await client.connect();
  const response = await client
    .db("Hospital")
    .collection("doctors")
    .findOne({ username: username, password: password });
  if (response !== null) return { success: true };
  else return { success: false };
};

controller.registerDoctor = async function (username, password) {
  // verify if username is unique or not
  await client.connect();
  const res = await client
    .db("Hospital")
    .collection("doctors")
    .findOne({ username: username });
  if (res !== null)
    return { success: false, message: "username already exists" };

  //now register user
  await client.connect();
  const response = await client
    .db("Hospital")
    .collection("doctors")
    .insertOne({ username: username, password: password });
  if (response !== null) {
    const user = {
      username,
      password,
    };
    try {
      const token = jwt.sign(user, appData.JsonSecretKey);
      return { success: true, token: token };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }
};

controller.registerPatient = async function (phoneNo, name, token) {
  //check if patient already exists
  const res = await client
    .db("Hospital")
    .collection("patients")
    .findOne({ phoneNo: phoneNo });
  if (res !== null) return { success: false, message: "Patient already exits" };

  //Register patient

  const register = await client
    .db("Hospital")
    .collection("patients")
    .insertOne({ phoneNo: phoneNo, name: name });
  if (register !== null) return { success: true, phoneNo: phoneNo };
  else return { success: false, message: "Unexpected error" };
};

controller.createReport = async function (username, password) {};
controller.allReports = async function (username, password) {};
module.exports = controller;
