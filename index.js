const express = require("express");
const cors = require("cors");
const app = express();
const route = require("./routing");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(
  "/",
  (req, res, next) => {
    console.log("Connected to server");
  },
  route
);
app.use(cors);
app.listen(4000);
