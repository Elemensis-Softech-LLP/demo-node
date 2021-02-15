const jwt = require('jsonwebtoken');
const configDB = require('../config/appConfig.js');

module.exports = {
    verifyToken,
}

async function verifyToken(req, res, next) {
    console.log('---',req.header('Authorization'));
    if (req.header('Authorization')) {
        try {
            const userDetails = jwt.verify(req.header('Authorization'), configDB.token.secret);
            req.user = userDetails;  
                     
            next();
        } catch (err) {
            return res.status(401).json({ success: false, isTokenExpired: true, message: 'Token Expired' });
        }
    } else {
        res.status(401).json({ success: false, message: 'Token Unavailable' });
    }
}