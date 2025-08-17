const rideService = require('../services/rideServices')
const userModel = require('../models/userModel')
const { validationResult } = require('express-validator')
const mapController = require('../controllers/mapController')
const mapService = require('../services/mapService')
const { sendMessageToSocketId } = require('../socket')
const captainModel = require('../models/captainModel')
const rideModel = require('../models/rideModel')



module.exports.createRide = async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }

    const { origin, destination, vehicleType } = req.body;
    const userId = req.userId
    try {
        const ride = await rideService.createRide({
            userId,
            origin,
            destination,
            vehicleType
        })

        const pickupCoordinates = await mapController.getCoordinates(origin)
        const ltd = pickupCoordinates.ltd
        const lng = pickupCoordinates.lng
        const captainsInRadius = await mapController.getCaptainsInRadius(ltd, lng, 3000000000)

        //fetch user details and send ride details on socket id
        const user = await userModel.findById(userId)
        sendMessageToSocketId(user.socketId, {
            event: 'rideData',
            data: ride
        })
        ride.otp = ""
        captainsInRadius.map(captain => {
            if (captain.status === 'active') {
                sendMessageToSocketId(captain.socketId, {
                    event: 'newRide',
                    data: ride
                })
            }
        })
        res.status(201).json(ride)


    } catch (err) {
        throw new Error(err.message)
    }




}

module.exports.getFare = async function (req, res, next) {
    const { origin, destination } = req?.query
    try {
        const fare = await rideService.getFare(origin, destination)
        if (fare === "ZERO_RESULTS") {
            res.status(404).json({ message: "No routes found" })
            return
        }
        res.status(200).json(fare)
    } catch (error) {
        throw new Error(error)
    }

}

module.exports.verifyOtp = async function (req, res, next) {
    const { otp, userId, rideId } = req.body
    const result = await rideService.verifyOtp(otp, userId, rideId)
    if (result) {
        const { socketId } = await userModel.findById(userId) //user socketId
        sendMessageToSocketId(socketId, {
            event: 'otpVerified',
            data: "Otp Verified"
        })
        return res.status(200).json(result)
    } else {
        return res.status(200).json(result)
    }

}

module.exports.acceptRide = async function (req, res, next) {
    const { userId, captainId, rideId } = req.body
    const result = await rideService.acceptRide(userId, captainId, rideId)
    const userSocketId = await userModel.findById(userId).select("socketId")
    const captain = await captainModel.findById(captainId)
    sendMessageToSocketId(userSocketId.socketId, {
        event: "rideAccepted",
        data: captain
    })
    return res.status(200).json(result)
}

module.exports.captainStatusChange = async function (req, res, next) {
    const { captainId, status } = req.body
    try {
        const result = rideService.captainStatusChange(captainId, status)
        return res.status(200).json(result)
    } catch (error) {
        throw new Error(error.array())
    }

}