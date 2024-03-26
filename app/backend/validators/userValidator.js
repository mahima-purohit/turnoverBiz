const Joi = require('joi');

const validateRegistration = (req, res, next) => {
    console.log("inside validateRegistration")
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    console.log('calling the next from validator');
    next();
};

const validateVerification = (req, res, next) => {
    console.log("inside validateVerification validator")
    const schema = Joi.object({
        email: Joi.string().email().required(),
        code: Joi.string().length(8).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};


module.exports = {
    validateRegistration, validateVerification
}
