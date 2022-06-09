const Joi = require("joi");

const registerVal = (data) => {
  const schemaVal = Joi.object({
    username: Joi.string().min(6).required(),
    role: Joi.number(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schemaVal.validate(data);
};

const loginVal = (data) => {
  const schemaVal = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schemaVal.validate(data);
};

module.exports = { registerVal, loginVal };
