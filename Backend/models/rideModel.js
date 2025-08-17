const mongoose = require('mongoose')


const rideSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    captainId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'captains'
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'ongoing', 'cancelled', 'completed'],
        default: 'pending'
    },
    duration: {
        type: Number //in seconds
    },
    distance: {
        type: Number //in meters
    },
    paymentId:{
        type:String
    },
    orderId:{
        type:String
    },
    signature:{
        type:String
    },
    otp:{
        type:String,
        required:true,
        select:false
    }
})

module.exports = mongoose.model('ride',rideSchema);