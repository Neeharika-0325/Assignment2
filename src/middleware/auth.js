const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports  = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        // console.log(token);
        const verifyToken = jwt.verify(token, process.env.ENCRYPTION_SECRET); 
        // console.log(verifyToken);
        req.userId = verifyToken.id;
        next();
    } catch {
        res.status(401).json({
            message: 'Authentication failed'
        })
    }
}