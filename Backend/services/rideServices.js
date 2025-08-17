const { json } = require('stream/consumers')
const rideModel = require('../models/rideModel')
const userModel = require('../models/userModel')
const { map } = require('../routes/rideRoutes')
const mapService = require('../services/mapService')
const crypto = require('crypto')
const { sendMessageToSocketId } = require('../socket')
const captainModel = require('../models/captainModel')

async function calculateFare(origin, destination) {
    if (!origin, !destination) {
        throw new Error("Enter pickup and destination")
    }
    try {
        
        const distanceTime = await mapService.getDistanceTime(origin, destination)
        if(distanceTime === 'ZERO_RESULTS'){
           const fares = 'ZERO_RESULTS';
           return fares
        }
        const { distance, duration } = distanceTime;

        // Example fare calculation logic
        // You can adjust base fare and per km/min rates as needed
        const baseFare = {
            car: 50,
            auto: 30,
            moto: 20
        };
        const perKm = {
            car: 10,
            auto: 8,
            moto: 6
        };
        const perMin = {
            car: 2,
            auto: 1.5,
            moto: 1
        };

        // Assuming distance in meters, duration in seconds
        const distanceKm = distance.value / 1000;
        const durationMin = duration.value / 60;

        const fares = {
            car: Math.round(baseFare.car + (perKm.car * distanceKm) + (perMin.car * durationMin)),
            auto: Math.round(baseFare.auto + (perKm.auto * distanceKm) + (perMin.auto * durationMin)),
            moto: Math.round(baseFare.moto + (perKm.moto * distanceKm) + (perMin.moto * durationMin))
        };
        return fares
    } catch (error) {
        throw new Error(error)
    }




}

function getOtp(num) {
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num));
    return otp.toString();
}

module.exports.verifyOtp = async function (otp, userId, rideId) {
    const result = await rideModel.find({ _id: rideId }).select('+otp')
    const inputOtp = otp
    const userOtp = result[0].otp


    if (inputOtp == userOtp) {
        await rideModel.findByIdAndUpdate(rideId, { status: "ongoing" })
        return true;
    } else {
        return false
    }
}


module.exports.createRide = async function ({ userId, origin, destination, vehicleType }) {
    if (!userId, !origin, !destination, !vehicleType) {
        throw new Error("All fields required for ride creation")
    }

    const fare = await calculateFare(origin, destination)
    const otp = getOtp(4)

    const ride = await rideModel.create({
        userId,
        origin,
        destination,
        fare: fare[vehicleType],
        otp
    })
    return ride;
}

module.exports.getFare = async function (origin, destination) {
    try {
        const fares = await calculateFare(origin, destination);
        return fares
    } catch (error) {
        throw new Error(error)
    }

}

module.exports.acceptRide = async function (userId, captainId, rideId) {
    const result = await rideModel.findByIdAndUpdate(rideId, {
        captainId: captainId,
        status: "accepted"
    });
    return result;
}

module.exports.captainStatusChange = async function (captainId, status) {
    try {
        console.log(captainId, status)
        const result = await captainModel.findByIdAndUpdate(captainId, { status: status })
        console.log("status update service")
        return result
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}