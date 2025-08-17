const express = require('express')
const { body } = require('express-validator')
const router = express.Router()
const tokenAuth = require('../middlewares/tokenAuth')
const captainController = require('../controllers/captainController')
const { captainStatusChange } = require('../services/rideServices')

router.post('/register',
    [
        body('email').isEmail().withMessage('Please enter a valid email address'),
        body('fullname.firstname').isString().isLength({ min: 3 }).withMessage('First name should be at least 3 characters long'),
        body('fullname.lastname').optional().isString().isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
        body('password').isString().notEmpty().withMessage('Password is required'),
        body('vehicle.color').isString().isLength({ min: 3 }).withMessage('Vehicle color must be at least 3 characters long'),
        body('vehicle.plate').isString().isLength({ min: 3 }).withMessage('Vehicle plate must be at least 3 characters long'),
        body('vehicle.capacity').isInt({ min: 1 }).withMessage('Vehicle capacity must be at least 1'),
        body('vehicle.vehicleType').isIn(['CAR', 'BIKE', 'RICKSHAW']).withMessage('Vehicle type must be car, bike, or auto'),
        body('location.lat').optional().isNumeric().withMessage('Latitude must be a number'),
        body('location.lng').optional().isNumeric().withMessage('Longitude must be a number')
    ]
    , captainController.registerCaptain);


router.get('/profile', tokenAuth.validateToken , captainController.getCaptainProfile)

router.post('/login', [
    body('email').isEmail().withMessage("Please enter a valid email address"),
    body('password').isString().notEmpty().withMessage("Password is required")
], captainController.loginCaptain)


router.get('/logout', tokenAuth.validateToken, captainController.logoutCaptain)
router.post('/aux', captainController.getAux)

module.exports = router;