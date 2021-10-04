const Socket = require('socket.io');
const {validateJWTServe} = require('../helpers/generate-jwt');
const {ChatMessages} = require('../models/chat-messages');

const chatMessages= new ChatMessages();



// TODO: Remove this when production is finished
const socketController = async( socket = new Socket(),io ) => { 
    
    //console.log('Client connected',socket.handshake.headers['jwt-tk']);
    
   //console.log(formatDate(Date.now()));
    
    const user=await validateJWTServe(socket.handshake.headers['jwt-tk']);
    
    if(!user){
        return socket.disconnect();
    }
    // add user connected
    chatMessages.connectUser(user);
    io.emit('users-assets', chatMessages.usersArr);
    socket.emit("receive-messages",chatMessages.topten);

    socket.on('disconnect', () => {
        chatMessages.disconnectUser(user._id);
        io.emit('users-assets', chatMessages.usersArr);
    })

    socket.on('sendMessage', ({message}) => {
        chatMessages.sendMessage(user._id, user.name ,message,user.img,formatDate(Date.now()));

        io.emit("receive-messages",chatMessages.topten);
    })

}

function formatDate(dateVal) {
    var newDate = new Date(dateVal);

    var sMonth = padValue(newDate.getMonth() + 1);
    var sDay = padValue(newDate.getDate());
    var sYear = newDate.getFullYear();
    var sHour = newDate.getHours();
    var sMinute = padValue(newDate.getMinutes());
    var sAMPM = "AM";

    var iHourCheck = parseInt(sHour);

    if (iHourCheck > 12) {
        sAMPM = "PM";
        sHour = iHourCheck - 12;
    }
    else if (iHourCheck === 0) {
        sHour = "12";
    }

    sHour = padValue(sHour);

    return sMonth + "-" + sDay + "-" + sYear + " " + sHour + ":" + sMinute + " " + sAMPM;
}
function padValue(value) {
    return (value < 10) ? "0" + value : value;
}



module.exports = {
    socketController
};
