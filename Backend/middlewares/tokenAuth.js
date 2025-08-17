const jwt = require('jsonwebtoken')
const blacklistedTokenModel = require('../models/blacklistedTokenModel')

module.exports.validateToken = async function (req, res, next) {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1] //get the token from header OR cookies


    if (!token) {
        return res.status(401).json("Unauthorized attempt") //if no token request should return
    }
    const isBlacklisted = await blacklistedTokenModel.findOne({token: token}) // check if token is blacklisted

    if(isBlacklisted){
        return res.status(401).json("Unauthorized attempt") //error if token is blacklisted
    }

    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) //decoding the token
        req.userId = decoded._id //passing only userid decoded from token to fetch profile from db
        next()
    } catch (err) { return res.status(401).json({message: "Unauthorized attempt"})} //if token is not validated profile will not show
} // it authorizes token from req.header OR req.cookies and returns decoded userID(payload)
