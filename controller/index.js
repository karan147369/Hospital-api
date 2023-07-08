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
  //first verify is username is unique or not
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
    const token = jwt.sign(user, appData.JsonSecretKey);
    return { success: true, token: token };
  } else return { success: false, message: "something went wrong" };
};

controller.registerPatient = async function (username, password) {};

controller.createReport = async function (username, password) {};
controller.allReports = async function (username, password) {};
module.exports = controller;
