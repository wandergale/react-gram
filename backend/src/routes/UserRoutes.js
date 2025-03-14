const express = require("express");
const router = express.Router();

// controller
const { register } = require("../controllers/UserController");

// Route
router.post("register", register);

module.exports = router;
