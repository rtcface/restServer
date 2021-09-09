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
        const { uid } = jsonwebtoken.verify(token,process.env.SECRETORPRIVATEKEY);
        req.user = await User.findById( uid );
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({message:'Invalid token'})
    }
}

module.exports = {
    validateJWT
};
