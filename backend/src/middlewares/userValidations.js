const { body } = require("express-validator");

const userCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome é obrigatório")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no minimo 3 caracteres."),
    body("email")
      .isString()
      .withMessage("E-mail é obrigatório")
      .isEmail()
      .withMessage("Insira um e-mail válido"),
    
  ];
};

module.exports = { userCreateValidation };
