
const { Router } = require('express');
const { check } = require('express-validator');

const { createProducts,
    getProducts,
    getProduct,
    putProducts,
    deleteProducts
     } = require('../controllers/products.controller');

const { existsProductById,existsProductName } = require('../helpers/db-validator');

const router = Router();

const { validateJWT,
  fieldsValidation,
  isAdminRole,
  validate_name_category } = require('../middlewares');

/* 
*{{url}}/api/categories
*/
//get all categories - public api
router.get('/', getProducts );
//get categories for id - public api
router.get('/:id',[
  check('id','is not valid id').isMongoId(),
  check('id').custom( existsProductById ),
  fieldsValidation
],getProduct);
//create products - private api - any whit valid token
router.post('/',[ 
  validateJWT,
  validate_name_category,
check('name','the name of the products is required').not().isEmpty(),
check('name').custom( existsProductName ),
fieldsValidation
 ],createProducts);
//update categories - private api - any whit valid token
router.put('/:id',[
  validateJWT,
  check('id','is not valid id').isMongoId(),
  check('name','the name of the producto is required').not().isEmpty(),
  fieldsValidation,
  validate_name_category,
  check('id').custom( existsProductById  ),
  check('name').custom( existsProductName ),
  fieldsValidation
],putProducts);
//delete categories - only ADMIN_ROLE
router.delete('/:id',[
  validateJWT,
  isAdminRole,
  check('id','is not valid id').isMongoId(),
  //check('id').custom( existsCategoryById  ),
  fieldsValidation
],deleteProducts);


module.exports = router;
