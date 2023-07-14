const express = require("express");
const cors = require("cors");
const app = express();
const route = require("./routing");
const bodyParser = require("body-parser");
const port = process.env.PORT;

console.log(process.env);
app.use(bodyParser.json());
app.use("/", route);
app.use(cors);
app.listen(port, "0.0.0.0");
