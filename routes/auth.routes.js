
const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { login, googleSingin,reNewToken } = require('../controllers/auth.controller');
const {  } = require('../middlewares');
const { fieldsValidation,validateJWT } = require('../middlewares');


router.post('/login',[
    check('mail','the email address is requerided').isEmail(),
    check('pass','the password is requerided').not().isEmpty(),
    fieldsValidation
],login);

router.post('/google',[    
    check('id_token','the id_token is requerided').not().isEmpty(),
    fieldsValidation
],googleSingin);


router.get('/', validateJWT,reNewToken)

module.exports = router;
