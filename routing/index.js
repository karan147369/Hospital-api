const express = require("express");
const routing = express.Router();
const controller = require("../controller");
const Auth = require("../Auth");

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

routing.post(
  "/patients/register",
  (req, res, next) => Auth.authDoctor(req.body.token, next),
  async (req, res, next) => {
    const response = await controller.registerPatient(
      req.body.phoneNo,
      req.body.name
    );
    if (response.success) res.json({ phoneNo: response.phoneNo });
    else res.json({ success: false, message: response.message });
  }
);
routing.post(
  `/patients/:id/create_report`,
  (req, res, next) => Auth.authDoctor(res, req.body.token, next),
  async (req, res, next) => Auth.isPatientRegistered(res, req.params.id, next),
  async (req, res, next) => {
    const response = await controller.createReport(
      req.body.token,
      req.params.id,
      req.body.status
    );
    if (response.success)
      res.json({
        patient_number: response.report.patient_number,
        doctor: response.report.doctor,
        status: response.report.status,
        date: response.report.date,
      });
    else res.json({ success: false });
  }
);

routing.get("/patients/:id/all_reports", async (req, res, next) => {
  const response = await controller.allReports();
});

routing.get("/reports/:status", async (req, res, next) => {});

module.exports = routing;
