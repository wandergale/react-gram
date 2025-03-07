require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const routes = require("./src/routes/Router.js");

const PORT = process.env.PORT;

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(cors({ credentials: true, origin: "http://localhost:3000" }));

server.use("/uploads", express.static(path.join(__dirname, "/uploads")));

require("./src/config/db.js");

server.use(routes);

server.listen(PORT, () => {
  console.log(`App on port: ${PORT}`);
});
