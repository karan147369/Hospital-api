const express = require("express");
const cors = require("cors");
const app = express();
const route = require("./routing");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors);
app.use("/", route);

app.listen(4000);
