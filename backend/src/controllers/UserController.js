const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecrete = process.env.JWT_SECRET;

const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecrete, {
    expiresIn: "7d",
  });
};

const register = async (req, res) => {
  res.send("Resgistrado");
};


module.exports = {
    register
}