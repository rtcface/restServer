const Role = require("../models/role");
const User = require("../models/user");
const Category = require("../models/category");
const Product = require("../models/product");

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

//check if exist Category Name
const existsCategoryName = async (name) => {
  const categoryName= name.toUpperCase(); 
  const validCategoryName = await Category.findOne({ name:categoryName });
  if (validCategoryName) {
    throw new Error(`the Category name:${ categoryName } is already in use`);
  }
};

//check if exist category 
const existsCategoryById = async (id) => {
  const validCat = await Category.findById( id );
  if (!validCat) {
    throw new Error(`the id: ${id} is not  exists DB`);
  }
};

//check if exist Product 
const existsProductById = async (id) => {
  const validCat = await Product.findById( id );
  if (!validCat) {
    throw new Error(`the id: ${id} is not  exists DB`);
  }
};

//check if exist Category Name
const existsProductName = async (name) => {
  const productName= name.toUpperCase(); 
  const validProductName = await Product.findOne({ name:productName });
  if (validProductName) {
    throw new Error(`the product name:${ productName } is already in use`);
  }
};

// validation of collections allowed

const allowedCollections = ( collection='', collections=[] ) =>{

    const include = collections.includes(collection);
    if(!include){
      throw new Error(`the collection ${collection} is not allowed, ${collections}`)
    }

    return true;
}

module.exports = {
  isValidRoles,
  mailExists,
  userById,
  userByRole,
  existsCategoryById,
  existsCategoryName,
  existsProductById,
  existsProductName,
  allowedCollections,
};
