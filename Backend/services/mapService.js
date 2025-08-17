const axios = require('axios')
module.exports.getCoordinates = async function (address) {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            }
        } else {
            throw new Error('Unable to fetch coordinates')
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getDistanceTime = async function (origin, destination) {
    if (!origin || !destination) {
        throw new Error("Origin and destination required.")
    }
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                return response.data.rows[0].elements[0].status
            }
            return response.data.rows[0].elements[0];
        } else {
            throw new Error('Unable to fetch distance and time')
        }
    } catch (error) {
        console.error("mapservice",error.message);
        
    }
}

module.exports.getAddressSuggestions = async function (input) {
    if(!input){
        throw new Error("Enter Address")
    }
    if(typeof input !== "string"){
        throw new Error("Input string error")
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`

    try {
        const suggestions = await axios.get(url)
        if(suggestions.data.status === 'OK'){
            return suggestions.data.predictions;
        }else{
            throw new Error("Unable to fetch suggestions")
        }
    } catch (error) {
        console.error(error);
        throw error
    }
}