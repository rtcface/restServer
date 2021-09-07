const Role = require("../models/role");
const User = require("../models/user");

const isValidRoles = async (role = "") => {
  const existsRole = await Role.findOne({ role });
  if (!existsRole) {
    throw new Error(`The role: ${role} does not exist in the database`);
  }
};

//check if the mail exists
const mailExists = async (mail) => {
  const validMail = await User.findOne({ mail });
  if (validMail) {
    throw new Error(`the mail: ${mail} already exists`);
  }
};

//check if exist User for id 
const userById = async (id) => {
  const validUser = await User.findById( id );
  if (!validUser) {
    throw new Error(`the id: ${id} is not  exists DB`);
  }
};

//check if exist Role 
const userByRole = async (role) => {
  const validUser = await User.findOne({ role });
  if (!validUser) {
    throw new Error(`the role: ${role} is not  exists DB`);
  }
};




module.exports = {
  isValidRoles,
  mailExists,
  userById,
  userByRole
};
