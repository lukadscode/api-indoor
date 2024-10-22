const { validationResult } = require("express-validator");
const { handleValidationErrors } = require("./errorHandler");

// Middleware de validation des entrées
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: handleValidationErrors(errors.array()),
    });
  }
  next(); // Si pas d'erreur, continuer vers le contrôleur
};

module.exports = {
  validateRequest,
};
