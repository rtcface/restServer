const role = require("../models/role");

const isAdminRole = (req = request, res = response, next) => {

    if(!req.user)
        {
            res.status(500).json({ 
                message: 'Validate the token firs before validating the role.'})
        }
        
    const {role, name} = req.user;

    if( role != 'ADMIN_ROLE' ){
        return res.status(401).json({
            message: `the user:${name} not is an administrator and cannot be removed users`

        })
    }

    next();

}

const haveRole = (...roles) => {
    
    return ( req = request, res = response,next) => {


        if(!req.user)
        {
            res.status(500).json({ 
                message: 'Validate the token firs before validating the role.'})
        }

        if( !roles.includes(req.user.role) ){
            return res.status(401).json({ message:`the service requires one of the followings roles:${ roles }` });
        }
    


        console.log(roles,req.user.role);

        next();
    }

}

module.exports = {
    isAdminRole,
    haveRole,
};
