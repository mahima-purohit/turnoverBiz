const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: String,
    token: {
        type: String
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
    interests: {
        type: [String]
    }
});
//Hash password before saving
userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashedPassword = await bcrypt.hash(this.password, 10);
        console.log(hashedPassword);
        this.password = hashedPassword;
        next();
    }
    catch (error) {
        next(error);
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;