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
    body("password")
      .isString()
      .withMessage("A senha é obrigatória")
      .isLength({ min: 8 })
      .withMessage("A senha precisa ter 8 caracteres"),
    body("confirmPassword")
      .isString()
      .withMessage("A confirmação da senha é obrigatória")
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error("Senhas precisam ser iguais");
        }
        return true;
      }),
  ];
};

const loginValidation = () => {
  return [
    body("email")
      .isString()
      .withMessage("O emil é obrigatorio")
      .isEmail()
      .withMessage("Insira um e-mail válido"),
    body("password").isString().withMessage("A senha é obrigatória"),
  ];
};

module.exports = { userCreateValidation, loginValidation };
