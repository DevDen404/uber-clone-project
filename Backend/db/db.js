const mongoose = require('mongoose')


//below we will create a function name dbconnect to connect with db using URI, then we will export the funct to use whenever we need to connect db
const dbconnect = function () {
    mongoose.connect(process.env.DB_URI)
    .then(()=>console.log('Connected db'))
    .catch((err)=>{console.log(err)})
}


module.exports = dbconnect