// IN THIS FILE WE DEFINE ALL API ROUTES LIKE /REGISTER /DELETE /FIND AND THEN CALL RESPECTIVE CONTROLLER METHOD TO PERFORM CRUD OPERATION

const express = require('express')
//creating below an express router in name of router
const router = express.Router()
// use express validator to validate data before saving it, use express validator body in api route as a callbacks to perform validation before posting anything
const { body } = require('express-validator')
const tokenAuth = require('../middlewares/tokenAuth')
const userController = require('../controllers/userController') // here all CRUD ops will be done and we will call correct method of CRUD in routes

router.post('/register',
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('fullname.firstname').isLength({ min: 3 }).withMessage('Invalid First Name, should be atleast 3 characters long'),
        body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long')
    ],
    userController.registerUser) // here syntax format is router.post(path, middleware(s), handlers) , if any /register is hit first all middleware will run and then respective controller will be called


router.post('/login',
    [
        body('email').isEmail().withMessage('Invalid email id'),
        body('password').isLength({ min: 6 }).withMessage('Password must be atleast 3 characters')
    ]
    , userController.loginUser)


router.get('/profile',tokenAuth.validateToken, userController.getUserProfile)

router.get('/logout',tokenAuth.validateToken , userController.logoutUser)

router.get('/delete',tokenAuth.validateToken, userController.deleteUser)



//exporting router below to use our mini router further in app.js
module.exports = router;