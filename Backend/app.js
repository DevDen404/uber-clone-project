//IN THIS FILE WE HAVE TO CONFIGURE ALL THE RELATIONSHIP BETWEEN INCOMING REQUEST TO MIDDLEWARES TO ROUTES, WHILE ALSO CONFIGURING DATABSE AND ANY OTHER LIBRARIES/FRAMEWORK
const userRoutes = require('./routes/userRoutes')
const captainRoutes = require('./routes/captainRoutes')
const rideRoutes = require('./routes/rideRoutes')
const mapRoutes = require('./routes/mapRoutes')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv') // for using .env
dotenv.config() // it extracts all variable in .env and creates an object as env.process.variables
const cors = require('cors') // for different port communication
const express = require('express'); // a framework for all backend application
const app = express(); // creating an app with express named as app
const dbconnect = require('./db/db') 
try{dbconnect()}catch(err){console.log(err)} //connecting db and catching error to prevent app crash

//DEFINING MIDDLEWARES AND ROUTES MIDDLEWARES
app.use(cors())  //passing cors as middlewares so that only allowed domains can access our app routes
app.use(express.json())
app.use(cookieParser())
app.use('/user', userRoutes)
app.use('/captain', captainRoutes)
app.use('/map', mapRoutes)
app.use('/ride', rideRoutes)
app.use((err,req,res,next)=>{
    res.status(500).json({error:err.message})
})

module.exports = app; //exporting app for further use in server