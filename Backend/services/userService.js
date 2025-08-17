const userModel = require('../models/userModel') //to create a new instance from model


module.exports.createUser = async function ({fullname,email,password}) {
    if(!fullname.firstname || !email || !password){
        throw new Error('All fields are required')
    }

    const user = userModel.create({
        fullname:{
            firstname: fullname.firstname,
            lastname: fullname.lastname,
        },
        email: email,
        password: password
    })

    return user;
} // in this function we are only create a user instance with help of userModel and then exporting it for further use

