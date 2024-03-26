const passport = require('./passport');
const jwt = require('jsonwebtoken');

// Define authentication middleware inline
const authenticate = (req, res, next) => {
    console.log("insidie authMiddleware.authenticate")
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        req.user = user;
        next();
    })(req, res, next);
};

const jwtAuth = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, 'secretKey', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        req.userId = decoded.id;
        next();
    });
};


module.exports = { authenticate, jwtAuth };
