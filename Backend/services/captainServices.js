const captainModel = require('../models/captainModel');

module.exports.createCaptain = async function (fullname, email, hashedPassword, vehicle, location) {
    if(!fullname.firstname || !email || !hashedPassword || !vehicle){
        throw new Error("All fields are required. Please enter all details.")
    }
    const captain = await captainModel.create({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname
        },
        email: email, 
        password: hashedPassword,
        vehicle: {
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        },
        location: {
            lat: location?.lat,
            lon: location?.lon
        }
    });

    return captain;
};

