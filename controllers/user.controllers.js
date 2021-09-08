const User = require("../models/user");
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

const getUser = async(req = request, res = response) => {
  //const { key, user, pass } = req.query;
  const condition = { status: true}
  const {limit = 5, from = 0} = req.query;

  const [total,users] = await Promise.all([
    User.countDocuments(condition),
    User.find(condition)
    .skip(Number(from))
    .limit(Number(limit))    
  ]) 
  res.json({
    total,
    users
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
  res.json(user);
};

const deleteUser = async(req = request, res = response) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id,{status: false});
  res.json({
   user
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
