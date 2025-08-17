//IN THIS FILE WE WILL CONFIGURE HOW OUR SERVER WILL START AND WHAT DETAILS WILL BE USED IN SERVER

const http = require('http') // for websocket io requires headers and modification 
const app = require('./app') // for creating a server around app we need to pass app in create server
const {initializeSocket} = require('./socket');
const port = process.env.PORT || 3000

const server = http.createServer(app) //creating http server around express app which listens for req,res
initializeSocket(server)
server.listen(port, ()=>{
    console.log(`Server started with port ${port}`) //starting server
});