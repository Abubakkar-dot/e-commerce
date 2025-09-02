const Joi = require("joi");

const hexColorPattern = /^([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

const productValidationSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  price: Joi.number().positive().required(),
  discount: Joi.number().min(0).max(100).required(),
  bgcolor: Joi.string().pattern(hexColorPattern).required(),
  panelcolor: Joi.string().pattern(hexColorPattern).required(),
  textcolor: Joi.string().pattern(hexColorPattern).required(),
});

module.exports = productValidationSchema;
