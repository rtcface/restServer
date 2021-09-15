
const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;
const {User,Product,Category} = require('../models');

const allowedCollections = [
    'users',
    'categories',
    'products',
    'roles'
];


const searchUsers = async(termino='', res) =>{
    const isMongoId = ObjectId.isValid(termino);

    if(isMongoId){
        const user = await User.findById(termino);
        return res.json({
           results: (user) ? [user] : []
        });
    }

    const regex = new RegExp(termino, 'i');

    const users = await User.find({
        $or:[{name:regex},{mail:regex}],
        $and:[{status:true}]        
    });

    res.json({
        total: users.length,
        results: users
    });
}

const searchProducts = async(termino='', res) =>{
    const isMongoId = ObjectId.isValid(termino);

    if(isMongoId){
        const product = await Product.findById(termino);
        return res.json({
           results: (product) ? [product] : []
        });
    }

    const regex = new RegExp(termino, 'i');

    const product = await Product.find({
        $or:[{name:regex}],
        $and:[{status:true}]        
    }) .populate("category","name");

    res.json({
        total: product.length,
        results: product
    });
}

const searchCategories = async(termino='', res) =>{
    const isMongoId = ObjectId.isValid(termino);

    if(isMongoId){
        const category = await Category.findById(termino);
        return res.json({
           results: (category) ? [category] : []
        });
    }

    const regex = new RegExp(termino, 'i');

    const category = await Category.find({
        $or:[{name:regex}],
        $and:[{status:true}]        
    });

    res.json({
        total: category.length,
        results: category
    });
}



const search = (req = request, res = response) => {


    const { collection, termino } = req.params;

    if(! allowedCollections.includes(collection)){
        res.status(400).json({
            message: `the collection with name ${collection} not found `
            +`the allowed collection are: ${allowedCollections}`
        });

    }

    switch (collection) {
        case "users" :
            searchUsers(termino,res);
            break;
        case "products":
            searchProducts(termino,res);
            break;
        case "categories":
            searchCategories(termino,res);
            break;
        default:
            res.status(500).json({
                message: `this method is temporarily disabled`
            })
            break;
    }


}

module.exports = {
    search
};
