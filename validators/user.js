const JoiBase = require('joi');
const JoiDate = require('@hapi/joi-date');

const Joi = JoiBase.extend(JoiDate);

const signUp = async (req, res, next) => {
  const bodySchema = Joi.object({
    firstName: Joi.string().empty(''),
    lastName: Joi.string().empty(''),
    email: Joi.string().email().empty(''),
  });

  try {
    const body = await bodySchema.validateAsync(req.body);
    req.body = body;
    return next();
  } catch (err) {
    return res.status(400).send({
      error: err.details[0].message,
    });
  }
};

module.exports = {
  signUp,
};
