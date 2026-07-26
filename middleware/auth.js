const jwt = require('jsonwebtoken');
require('dotenv').config();
const SCRECT_KEY = process.env.SCRECT_KEY;
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    const decoded = jwt.decode(authHeader);
    req.User = decoded;
    next();
};

module.exports = authMiddleware;