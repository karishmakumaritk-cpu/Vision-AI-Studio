const { body, validationResult } = require('express-validator');
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
  next();
};

exports.signupValidation = [body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 8 }), validate];
exports.loginValidation = [body('email').isEmail(), body('password').notEmpty(), validate];
