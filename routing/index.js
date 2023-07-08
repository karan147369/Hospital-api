const express = require("express");
const routing = express.Router();
const controller = require("../controller");

routing.get("/doctors/login", async (req, res, next) => {
  const response = await controller.verifyDoctor(
    req.body.username,
    req.body.password
  );
  res.json({ success: response.success });
});

routing.post("/doctors/register", async (req, res, next) => {
  const response = await controller.registerDoctor(
    req.body.username,
    req.body.password
  );
  if (response.success)
    return res.status(200).json({ success: true, token: response.token });
  else return res.json({ success: false, message: response.message });
});

routing.post("/patients/register", async (req, res, next) => {
  const response = await controller.registerPatient();
});
routing.get("/patients/:id/create_report", async (req, res, next) => {
  const response = await controller.createReport();
});

routing.get("/patients/:id/all_reports", async (req, res, next) => {
  const response = await controller.allReports();
});

routing.get("/reports/:status", async (req, res, next) => {});

module.exports = routing;
