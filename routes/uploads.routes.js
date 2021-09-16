
const { Router } = require('express');
const { check } = require('express-validator');
const {uploadFile} = require('../controllers/uploads.contollers');

const { fieldsValidation } = require('../middlewares/field-validator');


const router = Router();

router.post('/', uploadFile);




module.exports = router;
