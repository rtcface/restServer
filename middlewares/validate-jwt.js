const jsonwebtoken = require('jsonwebtoken');
const User = require("../models/user");

const validateJWT = async(req= request, res = response, next) => {

    const token = req.header('jwt-tk');

    if(!token) {
        return res.status(401).json({
            message:'ther is no tonke in the request'
        })
    }

    try {

        //Read user that corresponds to uid
        const { uid } = jsonwebtoken.verify(token,process.env.SECRETORPRIVATEKEY);
        console.log(uid);
        const user = await User.findById( uid );
        req.user =user;
       
         //check if the user exists to database
         if(!user){
            return res.status(401).json({
                message:'this user not exists to database', 
            })
        }


        //check if the user is active
        if(!user.status){
            return res.status(401).json({
                message:'this user is not active',
            })
        }


        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({message:'Invalid token'})
    }
}

module.exports = {
    validateJWT
};
