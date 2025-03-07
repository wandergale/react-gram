require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const routes = require("./routes/Router");

const PORT = process.env.PORT;

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(routes);

server.listen(PORT, () => {
  console.log(`App on port: ${PORT}`);
});
