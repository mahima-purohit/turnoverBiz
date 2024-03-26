const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const { validateRegistration, validateVerification } = require('../validators/userValidator');
// const { validateEmail } = require('../middlewares/emailMiddleware');
const authMiddleware = require("../middlewares/authMiddleware");
const interestsController = require("../controllers/interestsController");
const userInterestController = require("../controllers/userInterestController");


router.get("/users", userController.getUsers)
router.post('/users/register', validateRegistration, userController.registerUser);
// router.post('/verify', validateEmail, validateVerification, userController.verifyCode);
router.post('/users/verify', validateVerification, userController.verifyCode);
router.post('/users/login', authMiddleware.authenticate, userController.login);
router.get("/interests", authMiddleware.jwtAuth, interestsController.getInterests);
router.delete("/user/interests/:interest", authMiddleware.jwtAuth, userInterestController.removeInterestForUser)
router.post("/user/interests", authMiddleware.jwtAuth, userInterestController.addInterestForUser)

module.exports = router;
