const { body } = require("express-validator");

const photoInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("O titulo é obrigatório")
      .isString()
      .withMessage("O titulo é obrigatório")
      .isLength({ min: 3 })
      .withMessage("O titulo precisar ter no minimo 3 caracteres"),
    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("A imagem é obrigatória.");
      }
      return true;
    }),
  ];
};

const photoUpdateValidation = () => {
  return [
    body("title")
      .optional()
      .isString()
      .withMessage("O titulo é obrigatório")
      .isLength({ min: 3 })
      .withMessage("O titulo precisar ter no minimo 3 caracteres"),
  ];
};

const commentValidation = () => {
  return [
    body("comment").isString().withMessage("O comentario não pode ser vazio."),
  ];
};

module.exports = {
  photoInsertValidation,
  photoUpdateValidation,
  commentValidation,
};
