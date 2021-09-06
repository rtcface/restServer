const {Schema,model} = require('mongoose');

const RoleSchema = Schema({
    role: {
        type: String,
        required: ['Role user is necessary']
    }
});


module.exports = model('Role', RoleSchema);
