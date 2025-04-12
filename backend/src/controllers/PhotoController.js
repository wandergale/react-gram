const photo = require("../models/Photo");

const mongoose = require("mongoose");

// insert a photo. with an user related to it
const insertPhoto = (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  console.log(req.body);
  res.send("photo insert");
};

module.exports = { insertPhoto };
