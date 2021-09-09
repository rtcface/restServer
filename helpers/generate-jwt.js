const jsonwebtoken = require('jsonwebtoken');

const generateJWT = (uid = '') => {

    return new Promise((resolve, reject) => {
        const payload = { uid };
        jsonwebtoken.sign(payload,process.env.SECRETORPRIVATEKEY,{
            expiresIn:'6h'
        },(err,token) => {
            if (err) {
                console.log(err);
                reject('the token could not be generated');
            } else {
                resolve(token);
            }
        })
    })


}


module.exports = generateJWT;
