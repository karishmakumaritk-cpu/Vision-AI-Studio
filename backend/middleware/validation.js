const Joi = require('joi');

// Validate lead creation
exports.validateLead = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(2).max(100).required(),
    email: Joi.string().lowercase().email().required(),
    phone: Joi.string()
      .pattern(/^[0-9+\-\s()]*$/)
      .min(5)
      .max(20)
      .optional()
      .allow(''),
    business_type: Joi.string().trim().max(100).optional().allow(''),
    service_interest: Joi.string()
      .valid('website', 'automation', 'chatbot', 'voice', 'instagram', 'custom')
      .optional()
      .allow(''),
    message: Joi.string().trim().min(5).max(1000).required()
  });

  const { error, value } = schema.validate(req.body, { stripUnknown: true });

  if (error) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: error.details[0].message
    });
  }

  // Update req.body with sanitized values
  req.body = value;
  next();
};
