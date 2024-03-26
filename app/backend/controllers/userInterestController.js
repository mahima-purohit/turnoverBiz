const User = require("../models/userModel");
const { availableInterests } = require("./interestsController");

/**
 * Add interest for the user.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const addInterestForUser = async (req, res) => {
    try {
        const { interest } = req.body;
        try {
            if (availableInterests.includes(interest)) {
                await User.updateOne({ _id: req.userId }, { $addToSet: { interests: interest } });
            } else {
                return res.status(400).json({ message: 'Interest does not exist.' });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Not able to save inerest for user.' });
        }
        return res.status(201).json({ message: 'User interest saved.' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

/**
 * Remove interest for the user.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const removeInterestForUser = async (req, res) => {
    try {
        const interest = req.params.interest;
        try {
            await User.updateOne({ _id: req.userId }, { $pull: { interests: interest } });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Not able to remove inerest for user.' });
        }
        return res.status(201).json({ message: 'User interest removed.' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


module.exports = {
    addInterestForUser, removeInterestForUser
}