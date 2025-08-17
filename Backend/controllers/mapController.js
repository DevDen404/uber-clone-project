const captainModel = require('../models/captainModel');
const mapService = require('../services/mapService')
const { validationResult } = require('express-validator')

module.exports.getCoordinates = async function (origin) {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() })
    // }

    // const { address } = req.query;

    try {
        const coordinates = await mapService.getCoordinates(origin)
        ("controller", coordinates)
        // res.status(200).json(coordinates)
        return coordinates
    } catch (error) {
        // res.status(404).json({ message: 'Coordinates not found' })
    }
}

module.exports.getDistanceTime = async function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { origin, destination } = req.query;

    try {
        const distanceTime = await mapService.getDistanceTime(origin, destination)
        res.status(200).json(distanceTime)
    } catch (error) {
        res.status(404).json({ message: "Route not found" })
    }
}

module.exports.getAddressSuggestions = async function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { input } = req.query;
    const suggestions = await mapService.getAddressSuggestions(input)
    res.status(200).json(suggestions)
}

module.exports.getCaptainsInRadius = async function (ltd, lng, radius) {

    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, ltd], (radius/1.609) / 3963.2]
            }
        },
        status: 'active'
    });
    return captains;
    
}