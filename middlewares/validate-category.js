const Category = require("../models/category");

const validate_name_category = async (req = request, res = response, next) => {
    const { category } = req.query;
   
    if(!category)
        {
            return res.status(400).json({ 
                message: 'the name of the category parameter is required'})
        }
        
        const categoryName= category.toUpperCase(); 
        const validCategoryName = await Category.findOne({ name:categoryName });
        if (!validCategoryName) {
            res.status(404).json({ 
                message: `the category with name ${categoryName} not found`})
        }

        req.category=validCategoryName;

    next();
}

module.exports = {
    validate_name_category
};
