const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if(authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, data) => {
            if (err) {
                return res.status(403).json({ message: "Invalid Token"})
            } 
            req.data = data;
            next();
        })
    } else {
        return res.status(401).json({ message: "You are not authenticated"})
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.data.id === req.params.id || req.data.isAdmin) {
            next();
        } else {
            res.status(403).json({ message: "You are not allowed to do that" })
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAuthorization }