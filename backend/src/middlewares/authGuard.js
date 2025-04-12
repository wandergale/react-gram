const User = requie("../models/User.js");
const jwt = require("jsonwebtoken");
const jwtSecrete = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
  const authHeader = req.headers["authorization"]; // barear dyuuadydas
  const token = authHeader && authHeader.spli(" ")[1]; // we gonna get the second part "dyuuadydas"

  // check if header has a token
  if (!token) {
    res.status(401).json({ errors: ["Acesso negado"] });
    return;
  }

  // check if token is valid
  try {
    const verify = jwt.verify(token, jwtSecrete);

    res.user = await User.findById(verify.id).select("-password");

    next();
  } catch (error) {
    res.status(401).json({ errors: ["Token inválido"] });
  }
};

module.exports = authGuard;
