const connection = require("./db");
const express = require("express");
const app = express();

connection();

app.use(express.json());
require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));