const { response, request } = require("express");

const postUser = (req = request, res = response) => {
  const { name, old } = req.body;

  res.json({
    ok: true,
    msg: "post api - controllers",
    name,
    old,
  });
};

const getUser = (req = request, res = response) => {

  const { key,user,pass } = req.query;

  res.json({
    ok: true,
    msg: "Get api - controllers",
    key,
    user,
    pass
  });
};

const putUser = (req = request, res = response) => {

    const { id } = req.params;

    res.json({
        ok: true,
        msg: "Put api- controllers",
        id
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
