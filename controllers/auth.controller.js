const {request, response} = require('express');
const User = require('../models/user');



const login = async (req = request, res = response) => {

    const {mail,pass} = req.body;

    try {

        // check if the mail exists

        

        // check if the user is active

        // check if the password is correct

        // generate the JWT 

        res.json({
            msj:"login ok"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: " Error with login" });
    }

    res.json({
        msg: 'Login ok'
    });
}

module.exports = {
    login
};
