import Joi from 'joi';

export const validateUserRegistration = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    full_name: Joi.string().min(2).max(100).required(),
    phone: Joi.string().pattern(/^[0-9+\-\s()]+$/).optional(),
    address: Joi.string().max(500).optional()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateUserLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateProduct = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(200).required(),
    description: Joi.string().min(10).max(1000).required(),
    price: Joi.number().positive().precision(2).required(),
    category_id: Joi.number().integer().positive().required(),
    condition_type: Joi.string().valid('excellent', 'good', 'fair', 'poor').default('good'),
    location: Joi.string().max(100).optional()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateMessage = (req, res, next) => {
  const schema = Joi.object({
    receiver_id: Joi.number().integer().positive().required(),
    product_id: Joi.number().integer().positive().optional(),
    message: Joi.string().min(1).max(1000).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
