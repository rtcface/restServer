const {response} = require('express');
const path = require('path');
import { v4 as uuidv4 } from 'uuid';


const uploadFile =  ( req, res=response ) => {

 

  // res.json(
  //   {message:'prueba'}
  // )

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
      res.status(400).json({message:'No files were uploaded.'});
      return;
    }
     
      const {file} = req.files;
      const cutName = file.name.split('.');
      const ext = cutName[ cutName.length - 1];
      const validExtension = ['jpg','png','gif','jpeg'];

      if(!validExtension.includes(ext)){
        res.status(400).json({message: 'Invalid extension'});
      }

    // const uploadPath = path.join(__dirname,'../uploads/', file.name);
  
    // file.mv(uploadPath, (err) =>  {
    //   if (err) {
    //     return res.status(500).json({err});
    //   }
  
    //   res.json({message:'File uploaded to ' + uploadPath});
    // });

}

module.exports = {
    uploadFile
};
