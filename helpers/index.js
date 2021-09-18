const dbValidator  = require('./db-validator');
const fileUpload   = require('./file-upload');
const generateJWT  = require('./generate-jwt');
const googleVerify = require('./google-verify');

module.exports = {
    ...dbValidator,
    ...fileUpload,
    ...generateJWT,
    ...googleVerify
};



