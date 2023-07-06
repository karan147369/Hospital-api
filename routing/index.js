const express = require("express");
const routing = express.Router();
const controller = require("../controller");

routing.get("/doctors/login", async (req, res, next) => {
  const response = await controller.verifyDoctor(req.username, req.password);
});

routing.post("/doctors/register", async (req, res, next) => {
  const response = await controller.registerDoctor();
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
