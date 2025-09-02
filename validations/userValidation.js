// validations/userValidation.js
const Joi = require("joi");

const userValidationSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  cart: Joi.array().items(Joi.any()),        // Optional, can be empty
  orders: Joi.array().items(Joi.any()),      // Optional, can be empty
  contact: Joi.number(),
  picture: Joi.string().uri().optional()     // If image is a URL
});

module.exports = userValidationSchema;

