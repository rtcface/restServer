const Socket = require('socket.io');
const {validateJWTServe} = require('../helpers/generate-jwt');
const {ChatMessages} = require('../models/chat-messages');

const chatMessages= new ChatMessages();



// TODO: Remove this when production is finished
const socketController = async( socket = new Socket(),io ) => { 
    
    //console.log('Client connected',socket.handshake.headers['jwt-tk']);
    
    
    
    const user=await validateJWTServe(socket.handshake.headers['jwt-tk']);
    
    if(!user){
        return socket.disconnect();
    }
    // add user connected
    chatMessages.connectUser(user);
    io.emit('users-assets', chatMessages.usersArr);

    socket.on('disconnect', () => {
        chatMessages.disconnectUser(user._id);
        io.emit('users-assets', chatMessages.usersArr);
    })

}

module.exports = {
    socketController
};
