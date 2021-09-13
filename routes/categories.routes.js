
const { Router } = require('express');
const { check } = require('express-validator');

const { createCategories,
    getCategories,
    getCategory,
    putCategories,
    deleteCategories } = require('../controllers/categories.controllers');

const { existsCategoryById,
  existsCategoryName} = require('../helpers/db-validator');

const router = Router();

const { validateJWT,
  fieldsValidation,
  isAdminRole } = require('../middlewares');

/* 
*{{url}}/api/categories
*/
//get all categories - public api
router.get('/', getCategories );
//get categories for id - public api
router.get('/:id',[
  check('id','is not valid id').isMongoId(),
  check('id').custom( existsCategoryById ),
  fieldsValidation
],getCategory);
//create categories - private api - any whit valid token
router.post('/',[ 
  validateJWT,
check('name','the name of the category is required').not().isEmpty(),
fieldsValidation
 ],createCategories);
//update categories - private api - any whit valid token
router.put('/:id',[
  validateJWT,
  check('name','the name of the category is required').not().isEmpty(),
  check('id','is not valid id').isMongoId(),
  check('id').custom( existsCategoryById  ),
  check('name').custom( existsCategoryName ),
  fieldsValidation
],putCategories);
//delete categories - only ADMIN_ROLE
router.delete('/:id',[
  validateJWT,
  isAdminRole,
  check('id','is not valid id').isMongoId(),
  check('id').custom( existsCategoryById  ),
  fieldsValidation
],deleteCategories);

module.exports = router;
