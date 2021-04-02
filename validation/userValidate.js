const Joi = require('joi');
/**
 * check user data validation
 * @param user
 * @returns {*}
 */
 function validateUser(user) {
    const schema = {
      
        firstName: Joi.string().min(5).max(50).required(),
        lastName: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required(),
        role:Joi.number()
    };

    return Joi.validate(user, schema);
}

exports.validate = validateUser;
