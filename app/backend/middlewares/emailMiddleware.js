const Joi = require('joi');

const validateEmail = (req, res, next) => {
    console.log("Inside Validate mail middleware");
    const schema = Joi.object({
        email: Joi.string().email().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    console.log("here");
    next();
};

module.exports = {
    validateEmail
}
