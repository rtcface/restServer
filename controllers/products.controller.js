const { request, response } = require("express");
const Product = require("../models/product");

const createProducts = async (req = request, res = response) => {
  try {
    const { price, description, available } = req.body;
    const name = req.body.name.toUpperCase();
    const productDb = await Product.findOne({ name });

    if (productDb) {
      res.status(400).json({
        message: `the product: ${name} already exists`,
      });
    }

    // generate save data
    const dataProduct = {
      name,
      user: req.user._id,
      price,
      category: req.category._id,
      description,
      available,
    };

    const product = new Product(dataProduct);

    await product.save();

    res.status(201).json({
      message: "the product was successfully created",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "When in seems somthing i wrong try leter",
    });

    console.log(error);
  }
};

const getProducts = async (req = request, res = response) => {
  let cat = {};
  const condition = { status: true };
  const { limit = 5, from = 0 } = req.query;
  const [total, products] = await Promise.all([
    Product.countDocuments(condition),
    Product.find(condition)
      .skip(Number(from))
      .limit(Number(limit))
      .populate("user", "name")
      .populate("category","name")
  ]);

  res.json({
    total,
    products,
  });
};

const getProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id)
  .populate("user", "name")
  .populate("category", "name");

  res.json(product);
};

const putProducts = async (req, res) => {
  const { id } = req.params;

  const { status, user, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.user._id;
  data.price = data.price;
  data.category = req.category._id;
  data.description = data.description;
  data.available = data.available;

  const product = await Product.findByIdAndUpdate(id, data, { new: true });

  //await Category.findByIdAndUpdate(id,resto);

  res.json(product);
};

const deleteProducts = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  //await Category.findByIdAndUpdate(id,resto);

  res.json(product);
};
module.exports = {
  createProducts,
  getProducts,
  getProduct,
  putProducts,
  deleteProducts,
};
