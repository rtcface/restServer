const bcryptjs = require('bcryptjs');
const {request, response} = require('express');
const User = require('../models/user');
const generateJWT = require('../helpers/generate-jwt');


const login = async (req = request, res = response) => {

    const {mail,pass} = req.body;

    try {

        // check if the mail exists
        const user = await User.findOne({ mail });

        if(!user) {
            return res.status(400).json({
                msg: 'wrong user or password - user not found'
            });

        }
        

        // check if the user is active
        if( !user.status ) {
            return res.status(400).json({
                msg: 'wrong user or password - user status false'
            });

        }
        // check if the password is correct
        const validPassword = bcryptjs.compareSync(pass, user.pass);

        if( !validPassword ){
            return res.status(400).json({
                msg: 'wrong user or password - user pass incorrect'
            });

        }

        // generate the JWT 
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: " Error with login" });
    }

   
}

module.exports = {
    login
};
