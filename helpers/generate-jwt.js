const jsonwebtoken = require('jsonwebtoken');
const { User } = require('../models')

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

const validateJWTServe = async(token = '') => {
    
    try {
        if(token.length < 10) {
            return null;
        }

        const { uid } = jsonwebtoken.verify(token,process.env.SECRETORPRIVATEKEY);

        const user = await User.findById(uid);

        if(user) {
            if(user.status)
            {
                return user;
            }else
            {
                return null;
            }   
        }else{
            return null;
        }



    } catch (error) {
        console.log(error);
        return null;
    }

}


module.exports = {generateJWT, validateJWTServe};
