
const {Router} = require('express');

const router = Router();

const { getUser,
  putUser,
  postUser,
  deleteUser,
  patchUser } = require('../controllers/user.controllers');

  
router.post('/', postUser);

router.get('/',  getUser);

router.put('/:id', putUser);
  
router.delete('/', deleteUser);

router.patch('/', patchUser);






module.exports =  router;
