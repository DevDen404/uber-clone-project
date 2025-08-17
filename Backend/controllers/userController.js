//IN THIS FILE WE DEFINE SOME FUNCTIONS FOR CRUD OPERATIONS AND EXPORT FUNCTIONS AS A REGULAR FUNCTION SO THAT IT CAN BE CALLED IN ROUTES

const userModel = require('../models/userModel') //importing usermodel to perform CRUD on it
const userService = require('../services/userService') // to create an instance from usermodel
const { validationResult } = require('express-validator') // to check for error in validation
const blacklistedTokenModel = require('../models/blacklistedTokenModel')


module.exports.registerUser = async function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { fullname, email, password } = req.body
    const isAlreadyExist = await userModel.findOne({email:email})
    if(isAlreadyExist){
        return res.status(401).json("Email already registered.")
    }

    // const hashedPassword = await userModel.hashPassword(password);

    const result = await userService.createUser({
        fullname,
        email,
        password: password
    });

    const token = result.generateAuthToken()

    return res.status(200).json({ token, result })
}

module.exports.loginUser = async function (req, res, next) {

    //first checking errors OR security validation report by guard
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const result = await userModel.findOne({ email: req.body.email }).select('+password') //finding user in db with email
    if (!result) {
        return res.status(404).json("Email not registered.")
    }
    
    const isMatch = await result.comparePassword(req.body.password)
    if (!isMatch) {
        return res.status(401).json("Invalid email or password")
    }


    const token = result.generateAuthToken()
    res.cookie('token', token)
    return res.status(200).json({ token, result })


}

module.exports.getUserProfile = async function (req,res,next) {
    const profile = await userModel.findOne({_id: req.userId})
    return res.status(201).json({profile})
}

module.exports.logoutUser = async function (req,res,next) {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token


    if(!token){
        return res.status(401).json("Unauthorized attempt")
    }
    res.clearCookie('token')
    await blacklistedTokenModel.create({token: token})

    res.status(200).json("Logged Out")
}

module.exports.deleteUser = async function (req, res, next) {
    try {
        const userId = req.userId;
        res.clearCookie('token')
        const deletedUser = await userModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json("User not found");
        }
        res.status(200).json("User deleted successfully");
    } catch (error) {
        next(error);
    }
}