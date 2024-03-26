const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');
const User = require("../models/userModel");

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            console.log(JSON.stringify(user), "inside passposr startegy");
            if (!user) {
                return done(null, false, { message: "Incorrect email" });
            }
            console.log(password, user.password)
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                console.log("password invalid");
                return done(null, false, { message: "Incorrect Password" });
            }
            console.log("returning user");
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }

));

passport.serializeUser((user, done) => {
    done(null, user.id);
})
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    }
    catch (error) {
        done(error);
    }
});

module.exports = passport;


