const bcryptjs = require('bcryptjs');
const {request, response} = require('express');
const User = require('../models/user');
const {generateJWT} = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');


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

const googleSingin = async (req, res) => {

    const { id_token } = req.body;

    try {

        if(!id_token) {
            return res.status(400).json({
                msg: 'token is required'
            });

        }

        const {name,img,mail} = await googleVerify(id_token);
        
        let user = await   User.findOne({ mail });

        if(!user) {
            const data = {
                name,
                mail,
                pass:'password',
                img,
                createByGoogle: true
            };
            user = new User(data);
            await user.save();    
        }

        
        //verify status in the user in local databae
        if(!user.status){
            return res.status(401).json({
                message:'lock user contact to administrator'
            });
        }
        
        const token = await generateJWT( user.id ); 

        res.json({ 
            user,
            token    
        });

    } catch (error) {
        
        res.status(400).json({ message: " google token is not valid" });

    }
}

const reNewToken = async (req, res) => {
    const {user} = req;

     // generate the JWT 
     const token = await generateJWT(user.id);

    res.json({
        user, 
        token
    })
}

module.exports = {
    login, googleSingin,reNewToken
};
