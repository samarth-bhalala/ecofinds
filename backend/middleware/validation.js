import Joi from 'joi';

export const validateUserRegistration = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().pattern(/^[a-zA-Z0-9_-]+$/).min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    display_name: Joi.string().min(2).max(100).required()
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
    quantity: Joi.number().integer().min(1).default(1),
    category_id: Joi.number().integer().positive().required(),
    condition_type: Joi.string().valid('new', 'like-new', 'good', 'fair').default('good'),
    year_of_manufacture: Joi.number().integer().min(1900).max(new Date().getFullYear()).optional(),
    brand: Joi.string().max(100).optional(),
    model: Joi.string().max(100).optional(),
    length: Joi.number().positive().precision(2).optional(),
    width: Joi.number().positive().precision(2).optional(),
    height: Joi.number().positive().precision(2).optional(),
    weight: Joi.number().positive().precision(2).optional(),
    material: Joi.string().max(100).optional(),
    color: Joi.string().max(50).optional(),
    has_original_packaging: Joi.boolean().default(false),
    has_manual_instructions: Joi.boolean().default(false),
    working_condition_description: Joi.string().max(500).optional(),
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
