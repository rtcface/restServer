const { fieldsValidation } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isAdminRole, haveRole } = require('../middlewares/validator-role');
const { validate_name_category } = require('../middlewares/validate-category')




module.exports = {
    fieldsValidation,
    validateJWT,
    isAdminRole,
    haveRole,
    validate_name_category
};
