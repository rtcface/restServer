const path = require('path');
const { v4 : uuidv4 } = require('uuid');

//let validExtension ;

const fileUpload = (files, validExtension=['jpg','png','gif','jpeg'],folder='') => {

    return new Promise((resolve, reject) => {

      console.log(files);

       
        const {file} = files;
        const cutName = file.name.split('.');
        const ext = cutName[ cutName.length - 1];
        
    
        if(!validExtension.includes(ext)){
            return reject(`the extension: ${ext} is not supported, the supported extensions are: ${ validExtension }`);
            }
    
        const finishedName = uuidv4()+'.'+ext;
        const uploadPath = path.join(__dirname,'../uploads/',folder, finishedName);
    
    
    
        // const uploadPath = path.join(__dirname,'../uploads/', file.name);
      
        file.mv(uploadPath, (err) =>  {
          if (err) {
            return reject(err);
          }
      
          resolve( finishedName );
        });

    });



}

module.exports = {
    fileUpload,
};
