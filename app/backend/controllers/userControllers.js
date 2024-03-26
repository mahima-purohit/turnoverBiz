const User = require("../models/userModel");
const emailService = require("../services/emailServices");
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log('email in register', email);
        let user = await User.findOne({ email: email });
        console.log('user in registration', user);
        if (user) {
            return res.status(400).json({ message: "Email is already registered, please login" });
        }
        else {
            user = new User({ name, email, password })
        }
        // await user.save();
        // const verificationCode = Math.floor(10000000 + Math.random() * 90000000).toString();
        const verificationCode = "12345678";
        user.verificationCode = verificationCode;
        console.log('before saving the user')
        await user.save();
        console.log('after saving the user');
        emailService.sendVerificationEmail(email, verificationCode);
        return res.status(201).json({ message: 'User registered successfully. Please verify your email.' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const verifyCode = async (req, res) => {
    try {
        const { email, code } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        if (user.verificationCode !== code) {
            return res.status(400).json({ message: "Invalid verification code." })
        }
        user.isVerified = true;
        await user.save();
        res.status(201).json({ message: "Email verified successfully. " });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error.' });
    }
}

const login = async (req, res) => {
    console.log("inside userController.login");
    try {
        console.log(req.user._id);
        const token = jwt.sign({ id: req.user._id }, "secretKey", { expiresIn: '3h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

module.exports = {
    registerUser, verifyCode, getUsers, login
}