const {response} = require('express');

const uploadFile =  ( req, res=response ) => {

    console.log(req.files);

    res.json({
        msg: 'Uploading file'
    })

}

module.exports = {
    uploadFile
};
