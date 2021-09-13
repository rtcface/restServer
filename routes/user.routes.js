
const {Router} = require('express');
const { check } = require('express-validator');


const router = Router();

const { getUser,
    putUser,
    postUser,
    deleteUser,
    patchUser } = require('../controllers/user.controllers');

const { isValidRoles,
   mailExists,
   userById,
   userByRole } = require('../helpers/db-validator');

// the middlewares
const { fieldsValidation,
  validateJWT,
  haveRole } = require('../middlewares');

// the routes

router.get('/',  getUser);
  

router.post('/', [
  check('name','the name cannot be empty').not().isEmpty(),
  check('pass','the password to have more seix characteres').isLength({ min: 6}),
  check('mail','the mail is not valid').isEmail(),  
  //check('role','the role is not valid').isIn(['ADMIN_ROLE','USER_ROLE']),
  check('role').custom( isValidRoles ),
  check('mail').custom( mailExists ),  
  fieldsValidation
] , postUser);


router.put('/:id',[
  check('id','is not valid id').isMongoId(),
  check('id').custom( userById ),
  check('role').custom( userByRole ),
  fieldsValidation
], putUser);
  
router.delete('/:id',[
  validateJWT,
  //isAdminRole,
  haveRole('USER_ROLE','VENTAS ROLE','OTRO_ROLE'),
  check('id','is not valid id').isMongoId(),
  check('id').custom( userById ),
  fieldsValidation
], deleteUser);

router.patch('/', patchUser);

module.exports =  router;
