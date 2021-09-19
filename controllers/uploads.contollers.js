const { response } = require("express");
const path = require("path");
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );



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

const getFiles = async (req, res = response) => {

  const{ id, collection } = req.params;

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
    
  //  const resp= cloudinary.image(model.img, {type: "fetch", transformation: [
  //     {gravity: "face", height: 300, width: 300, crop: "fill"},
  //     {radius: "max"},
  //     {fetch_format: "auto"}
  //     ]});

  //     console.log(res);
    //const imgPath= path.relative(model.img);

    return res.send(model.img);

    // if(fs.existsSync(imgPath)){
    //   return res.sendFile(imgPath);
    // }

  }
   const assetsImg=path.join(__dirname,'../assets/no-image.jpg');
   
   
   return res.sendFile(assetsImg);

  // res.json({
  //   message:'Missing placeholder'
  // });
};


const updatePictureCloudinary = async (req, res = response) => { 
  
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
    const nameArray = model.img.split('/');
    const name = nameArray[nameArray.length - 1];
    const [ publicId ] = name.split('.');

    cloudinary.uploader.destroy(publicId);
  }


  const { tempFilePath } = req.files.file;
  
  const {secure_url} = await cloudinary.uploader.upload( tempFilePath );



  // const nameFile = await fileUpload(req.files, undefined, collection);
   model.img = secure_url;

   await model.save();

  res.json({
    model
  });
};





module.exports = {
  uploadFile,
  updatePicture,
  getFiles,
  updatePictureCloudinary
};
