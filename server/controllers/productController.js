import Product from "../models/productModel.js";

//@desc Fetch all products
//@routes GET /api/products/
//@access Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    //handle
  }
};

//@desc Fetch single products
//@routes GET /api/products/:id
//@access Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    //handle
  }
};

export { getProducts, getProductById };
