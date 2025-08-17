//IN THIS FILE WE DEFINE SCHEMA OF DB ENTRIES/COLLECTIONS AND WE CREATE A MODEL FOR THE COLLECTION, WE CAN DEFINE SOME DB LOGICS HERE ALSO INSTANCE,STATIC METHODS CAN BE DEFINED WHICH WE CAN CALL ONLY ON SPECIFIC MODEL/INSTANCE
const mongoose = require('mongoose');

const bcrypt = require('bcrypt'); // bcrypt for password hashing
const jwt = require('jsonwebtoken'); // for json web token
const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            minlength: [3, "First name should be atleast 3 characters"],
            required: true
        },
        lastname: {
            type: String,
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minlength: [3, 'Email should be atleast 3 characters long']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    }
}); // userSchema/ blueprint is created on basis of which a model will be created

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10) //hashes password before saving any instance, this.password refers to alrady created user instance before save
    next()
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn:"1d"});  //an instance method can be called once instance is created
    return token
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10) // a static method which can be called on model (User) anytime
}

const User = mongoose.models.User || mongoose.model('User', userSchema); // exporting either already created instance of User or creating new instance

module.exports = User; // exporting User model to use it's methods further