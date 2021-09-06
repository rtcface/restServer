const  Role  = require('../models/role');
const User = require('../models/user');

const isValidRoles = async( role='' )=>{
    const existsRole = await Role.findOne({ role });
    if(!existsRole){
      throw new Error(`The role: ${role} does not exist in the database`);
    } 
  }

  //check if the mail exists
  const mailExists = async (mail) => {   
  const validMail= await User.findOne({ mail });
  if( validMail ) {
      throw new Error(`the mail: ${mail} already exists`);
  }

  }
  
  


  module.exports = {
      isValidRoles,
      mailExists
  };
  