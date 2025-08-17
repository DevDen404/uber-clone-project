const express = require('express')
const tokenAuth = require('../middlewares/tokenAuth')
const router = express()
const { body } = require('express-validator')
const rideController = require('../controllers/rideController')

router.post('/createRide',
    body('origin').isString().isLength({ min: 3 }).withMessage("Enter pickup address"),
    body('destination').isString().isLength({ min: 3 }).withMessage("Enter destination"),
    body('vehicleType').isString().isIn(['auto', 'moto', 'car']).isLength({ min: 3 }).withMessage("Enter vehicle type"),
    tokenAuth.validateToken,
    rideController.createRide
)

router.get('/getFare',
    body('origin').isString().isLength({ min: 3 }).withMessage("Enter pickup address"),
    body('destination').isString().isLength({ min: 3 }).withMessage("Enter destination"),
    tokenAuth.validateToken,
    rideController.getFare
)

router.post('/captainStatusChange',rideController.captainStatusChange)

router.post('/verifyOtp',rideController.verifyOtp)
router.post('/acceptRide',rideController.acceptRide)
module.exports = router;