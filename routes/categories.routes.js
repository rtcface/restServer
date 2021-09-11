
const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { fieldsValidation } = require('../middlewares/field-validator');

/* 
*{{url}}/api/categories
*/
//get all categories - public api
router.get('/',( req, res ) => {    
  return res.json('Get all categories');    
});
//get categories for id - public api
router.get('/:id',( req, res ) => {    
  return res.json('Get categories for id');     
});
//create categories - private api - any whit valid token
router.post('/',( req, res ) => {    
  return res.json('Create categories');    
});
//update categories - private api - any whit valid token
router.put('/:id',( req, res ) => {    
  return res.json('Update categories');    
});
//delete categories - only ADMIN_ROLE
router.delete('/:id',( req, res ) => {    
  return res.json('Delete categories');    
});

module.exports = router;
