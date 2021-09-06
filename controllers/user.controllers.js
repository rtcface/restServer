const User = require("../models/user");
const { response, request } = require("express");
const bcryptjs = require('bcryptjs');
const { validationResult } = require("express-validator");


const postUser = async(req = request, res = response) => {
  const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);  
    }


  const { name, mail, pass, role } = req.body;
  const user = new User({ name, mail, pass, role });

  //check if the mail exists
  const mailExists = await User.findOne({ mail });
  
  if( mailExists ) {
      return res.status(400).json({ 
        message: 'Mail already exists'
       });
  }

  //encrypt the password
  const salt = bcryptjs.genSaltSync();

  user.pass = bcryptjs.hashSync(pass,salt);


  await user.save();
  res.json({
    ok: true,
    msg: "post api - controllers",
    user
  });
};

const getUser = (req = request, res = response) => {
  const { key, user, pass } = req.query;

  res.json({
    ok: true,
    msg: "Get api - controllers",
    key,
    user,
    pass,
  });
};

const putUser = (req = request, res = response) => {
  const { id } = req.params;

  res.json({
    ok: true,
    msg: "Put api- controllers",
    id,
  });
};

const deleteUser = (req = request, res = response) => {
  res.json({
    ok: true,
    msg: "delete api - controller ",
  });
};
const patchUser = (req = request, res = response) => {
  res.json({
    ok: true,
    msg: "patch api - controller ",
  });
};

module.exports = {
  getUser,
  putUser,
  postUser,
  deleteUser,
  patchUser,
};
