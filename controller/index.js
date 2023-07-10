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
  if (response !== null) {
    const user = { username: username, password: password };
    const token = jwt.sign(user, appData.JsonSecretKey);
    return { success: true, token: token };
  } else return { success: false };
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

controller.registerPatient = async function (phoneNo, name) {
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

controller.createReport = async function (token, id, status) {
  const decode = jwt.decode(token, appData.JsonSecretKey);
  const date = new Date();
  const register = await client
    .db("Hospital")
    .collection("reports")
    .insertOne({
      patient_number: id,
      report: { doctor: decode.username, status: status, date: date },
    });
  if (register !== null)
    return {
      success: true,
      report: {
        patient_number: id,
        doctor: decode.username,
        status: status,
        date: date,
      },
    };
  else return { success: false, message: "Unexpected error" };
};
controller.allReports = async function (id) {
  const response = await client
    .db("Hospital")
    .collection("reports")
    .aggregate([
      { $match: { patient_number: id } },
      {
        $group: { _id: "$patient_number", reports: { $push: "$report" } },
      },
    ])
    .toArray();

  if (response.length === 0)
    return { empty: true, message: `No report found for patient_no: ${id}` };
  else return { empty: false, data: response };
};
controller.allReportsStatusWise = async (status) => {
  const response = await client
    .db("Hospital")
    .collection("reports")
    .aggregate([
      { $match: { "report.status": status } },
      {
        $group: { _id: "$patient_number", reports: { $push: "$report" } },
      },
    ])
    .toArray();

  if (response.length === 0)
    return { empty: true, message: `No report found for status: ${status}` };
  else return { empty: false, data: response };
};
module.exports = controller;
