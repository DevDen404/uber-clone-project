const { validationResult } = require('express-validator');
const captainModel = require('../models/captainModel');
const captainService = require('../services/captainServices')
const blacklistedTokenModel = require('../models/blacklistedTokenModel')

module.exports.registerCaptain = async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json("Please check all fields again and enter details in required format.");
    };

    const { fullname, email, password, status, vehicle, location } = req.body;

    const isAlreadyExist = await captainModel.findOne({ email: email });
    if (isAlreadyExist) {
        return res.status(401).json("Email already registered");
    };

    const hashedPassword = await captainModel.hashPassword(password); //hashing password before captain registration

    try {
        const captain = await captainService.createCaptain(fullname, email, hashedPassword, vehicle, location); //register  captain
        const token = await captain.generateAuthToken();
        return res.status(201).json({ token, captain });
    } catch (error) {
        throw new Error(error.message)
    };


};

module.exports.getCaptainProfile = async function (req, res, next) {
    const userId = req.userId
    if (!userId) {
        return res.status(401).json("Unauthorized attempt")
    }
    try {
        const captain = await captainModel.findOne({ _id: userId })
        res.status(201).json({ captain })
    } catch (error) {
        throw new Error(error.message)
    }

}

module.exports.loginCaptain = async function (req, res, next) {

    const { email, password } = req.body

    if (!email || !password) {
        return res.status(401).json("Invalid email or password")
    }

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(401).json("Invalid email or password")
    }

    try {
        const captain = await captainModel.findOne({ email: email })
        const token = await captain.generateAuthToken()
        res.cookie('token', token)
        res.status(201).json({ token, captain })

    } catch (error) {
        throw new Error(error.message)
    }

}

module.exports.logoutCaptain = async function (req, res, next) {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token
    if (!token) {
        return res.status(401).json("Unauthorized attempt")
    }
    try {
        await blacklistedTokenModel.create({ token: token })
        res.clearCookie('token')
        return res.status(201).json("Logged Out")
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports.getAux = async function (req, res, next) {

    try {
        const { captainId } = req.body
        console.log("getAUx",req.body)
        const result = await captainModel.findById(captainId)
        const status = result.status
        res.status(200).json({status})
    } catch (error) {
        throw new Error(error.message)
    }
}