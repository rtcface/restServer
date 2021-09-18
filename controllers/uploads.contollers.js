const { response } = require("express");
const path = require("path");
const fs = require('fs');

const { fileUpload } = require("../helpers");
const { User, Product } = require("../models");
const uploadFile = async (req, res = response) => { 

  try {

    const nameFile = await fileUpload(req.files, undefined, "img");
    res.json({ nameFile });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

const updatePicture = async (req, res = response) => { 
  
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res
          .status(400)
          .json({ message: `the id: ${id} in the database not found` });
      }
      break;

    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res
          .status(400)
          .json({ message: `the id: ${id} in the database not found` });
      }
      break;

    default:
      res
        .status(500)
        .json({ message: "This model is not available temporarily" });
      break;
  }

  // deleted images previously

  if(model.img){
    const imgPath= path.join(__dirname, '../uploads', collection, model.img);

    if(fs.existsSync(imgPath)){
      fs.unlinkSync(imgPath);
    }

  }


  const nameFile = await fileUpload(req.files, undefined, collection);
  model.img = nameFile;

  await model.save();

  res.json({
    model,
  });
};

module.exports = {
  uploadFile,
  updatePicture,
};
