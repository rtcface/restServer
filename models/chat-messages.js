class Message {
    constructor(uid,name,message,img, date) {

        this.uid = uid;
        this.name = name;
        this.message = message;
        this.img = img;
        this.date = date;
        
    }
}




class ChatMessages {

    constructor() {

        this.messages = [];
        this.users = {};
        
    }

    get topten() {     
        this.messages = this.messages.splice(0,10);
        return this.messages;
    }

    get usersArr(){
        return Object.values(this.users);
    }

    sendMessage( uid, name, message, img, date){
        this.messages.unshift(
            new Message(uid, name, message, img, date)
        );
    }

    connectUser(  user ){        
        this.users[user._id] = user;
    }

    disconnectUser( uid ){
        delete this.users[uid];
    }

}


module.exports = { ChatMessages };
