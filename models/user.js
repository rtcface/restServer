const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required:[true,'Name user is necessary'],        
    },
    mail: {
        type: String,
        required:[true,'Mail user is necessary'],
        unique: true,
    },
    pass: {
        type: String,
        required:[true,'The password is necessary'],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required:[true,'The role is necessary'],
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true    
    },
    createByGoogle: {
        type: Boolean,
        default: false
    }
    
    
});

module.exports = model('User', UserSchema)
