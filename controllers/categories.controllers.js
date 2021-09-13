const { request, response } = require('express');
const Category  = require('../models/category');


const createCategories =  async ( req = request, res = response) =>{

    try {

        const name = req.body.name.toUpperCase();
    const categoryDb = await Category.findOne({ name });

    if(categoryDb){
        res.status(400).json({
            message:`the category: ${ name } already exists`,
        });
    }


    // generate save data
    const dataCategory = {
        name,
        user: req.user._id
        }
    
    const category =  new Category( dataCategory );

    await category.save();

    res.status(201).json({
        message:'the category was successfully created',
        category
    })


        
    } catch (error) {
        res.status(500).json({
            message:'When in seems somthing i wrong try leter',
            
        });

        console.log(error);
    }

    

    

};

const getCategories = async (req = request, res = response) => {
    let cat={};
    const condition = { status: true }
    const { limit = 5, from = 0 } = req.query;   
     const [total,categories] = await Promise.all([
        Category.countDocuments(condition),
        Category.find(condition)
        .skip(Number(from))
        .limit(Number(limit))
        .populate('user', 'name')
      ]); 
      
      res.json({       
        total,categories
      });


};

const getCategory = async(req = request, res = response) => {
  const { id } = req.params;  
  const user = await Category.findById(id)
  .populate('user','name'); 

  res.json(user);
}

const putCategories = async (req, res) => {
    const { id } = req.params;
    
    const { status,user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;
  
    const category = await Category.findByIdAndUpdate(id, data, { new:true } );
    
    //await Category.findByIdAndUpdate(id,resto);
    
   
    res.json(category);
}

const deleteCategories = async (req, res) => {
    const { id } = req.params;
    
    const category = await Category.findByIdAndUpdate(id, { status: false }, { new:true });
    
    //await Category.findByIdAndUpdate(id,resto);
    
  
    res.json(category);
}
module.exports = {
    createCategories, getCategories, getCategory, putCategories,deleteCategories 
};
