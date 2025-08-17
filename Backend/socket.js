const socketIo = require('socket.io');
const userModel = require('./models/userModel')
const captainModel = require('./models/captainModel')
let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log(`Socket connected: ${socket.id}`);

        socket.on('join', async (data) => {
            const { userId, userType } = data;
            if (userType === 'user') {
                
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        })

        socket.on('updateCaptainLocation', async (data) => {

            const {userId,ltd,lng} = data;
            await captainModel.findByIdAndUpdate(userId, { location:{
                ltd:ltd,
                lng:lng
            } })
        })

        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });

}


function sendMessageToSocketId(socketId, msg) {
    if (io) {
        console.log("sendon",msg.event,socketId)
        io.to(socketId).emit(msg.event, msg.data)
    } else {
        console.log('SocketIo not initialized')
    }
}

module.exports = {
    initializeSocket,
    sendMessageToSocketId,
};