
const {Router} = require('express');
const { check } = require('express-validator');

const router = Router();

const { getUser,
  putUser,
  postUser,
  deleteUser,
  patchUser } = require('../controllers/user.controllers');

  
router.post('/', [
  check('name','the name cannot be empty').not().isEmpty(),
  check('pass','the password to have more seix characteres').isLength({ min: 6}),
  check('mail','the mail is not valid').isEmail(),
  check('role','the role is not valid').isIn(['ADMIN_ROLE','USER_ROLE']),
] , postUser);

router.get('/',  getUser);

router.put('/:id', putUser);
  
router.delete('/', deleteUser);

router.patch('/', patchUser);






module.exports =  router;
