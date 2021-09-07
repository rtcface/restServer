const User = require("../models/user");
const { encryptPassword } = require("../helpers/db-validator");
const bcryptjs = require('bcryptjs');


const postUser = async(req = request, res = response) => {

  const { name, mail, pass, role } = req.body;
  
  const user = new User({ name, mail, pass, role });  

  //encrypt the password
  const salt = bcryptjs.genSaltSync();
  user.pass= bcryptjs.hashSync(pass,salt);

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

const putUser = async(req = request, res = response) => {
  const { id } = req.params;
  const { _id,pass,createByGoogle,mail, ...resto } = req.body;

  //TODO: validate egainst database
  if (pass) {
    const salt = bcryptjs.genSaltSync();
    resto.pass= bcryptjs.hashSync(pass,salt);  
  }

  const user = await User.findByIdAndUpdate(id,resto);


  res.json({
    ok: true,
    msg: "Put api- controllers",
    user,
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
