const User = require("../models/User");
const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecrete = process.env.JWT_SECRET;

const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecrete, {
    expiresIn: "7d",
  });
};

const hashPassword = async (password) => {
  //Generate password hash
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  return passwordHash;
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  //check if user already exits
  const user = await User.findOne({ email });

  if (user) {
    res.status(422).json({ errors: ["E-mail ja está cadastrado"] });
    return;
  }

  //create new user
  const newUser = await User.create({
    name,
    email,
    password: hashPassword(password),
  });

  // check if user was created succesfully
  if (!newUser) {
    res.status(422).json({ errors: ["Erro ao criar usuário"] });
    return;
  }

  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  //check if user dont exists
  if (!user) {
    res.status(404).json({ errors: ["Usuário não encontrado"] });
    return;
  }

  //check if password matches
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ errors: ["Senha inválida"] });
    return;
  }

  //return user as token
  res.status(201).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id),
  });
};

// get current user
const getCurrentUser = async (req, res) => {
  const user = req.user;

  res.status(200).json(user);
};

// update an user
const update = async (req, res) => {
  const { name, password, bio } = req.body;

  let profileImage = null;

  if (req.file) {
    profileImage = req.file.filename;
  }

  const reqUser = req.user;

  const user = await User.findById(
    new mongoose.Types.ObjectId(reqUser._id)
  ).select("-password");

  if (name) {
    user.name = name;
  }

  if (password) {
    user.password = hashPassword(password);
  }

  if (profileImage) {
    user.profileImage = profileImage;
  }

  if (bio) {
    user.bio = bio;
  }

  await user.save();

  res.status(200).json(user);
};

module.exports = {
  register,
  login,
  getCurrentUser,
  update,
};
