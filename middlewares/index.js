const { fieldsValidation } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isAdminRole, haveRole } = require('../middlewares/validator-role');




module.exports = {
    fieldsValidation,
    validateJWT,
    isAdminRole,
    haveRole,
};
