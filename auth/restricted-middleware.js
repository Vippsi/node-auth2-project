const jwt = require("jsonwebtoken");
const constants = require("../config/constants")

module.exports = (req, res, next) => {
    const token = req.headers.authorization

    if(token) {
        jwt.verify(token, constants.jwtSecret,(err, decodedToken) => { if(err) {
            res.status(401).json({message: 'The items beyond this gate are too much for your mortal eyes'})
        } else {
            req.decodedToken = decodedToken
            next()
        }
            
        })
    }else {
        res.status(401).json({message: "Please provide credentials "})
    }
}