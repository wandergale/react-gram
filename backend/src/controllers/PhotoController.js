const Photo = require("../models/Photo");
const User = require("../models/User");

const mongoose = require("mongoose");

// insert a photo. with an user related to it
const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  const reqUser = req.user;

  const user = await User.findById(reqUser.id);

  // create photo
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });

  // if photo create with success, return data
  if (!newPhoto) {
    res.status(422).json({ errrors: ["Houve um problema"] });
    return;
  }

  res.status(201).json(newPhoto);
};

module.exports = { insertPhoto };
