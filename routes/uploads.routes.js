
const { Router } = require('express');
const { check } = require('express-validator');
const {uploadFile, updatePictureCloudinary, getFiles} = require('../controllers/uploads.contollers');

const { fieldsValidation, fileValidator } = require('../middlewares');

const { allowedCollections } = require('../helpers');


const router = Router();

router.post('/',[
    fileValidator,
    check('id','is not valid id').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['users','products'] )  ),
    fieldsValidation
], uploadFile);

router.put('/:collection/:id',[
    fileValidator,
    check('id','is not valid id').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['users','products'] )  ),
    fieldsValidation
],updatePictureCloudinary );


router.get('/:collection/:id',[
  
],getFiles);




module.exports = router;
