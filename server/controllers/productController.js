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

//@desc Delete product by id
//@routes DELETE /api/products/:id
//@access Private/Admin
const deleteProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ message: "Product removed successfully" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    //handle
  }
};

//@desc Create product
//@routes POST /api/products
//@access Private/Admin
const createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: "Sample name",
      price: 0,
      user: req.user._id,
      image: "images/sample.jpg",
      brand: "Sample brand",
      category: "Sample category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample desc",
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    //handle
  }
};

//@desc Update a product
//@routes PUT /api/products/:id
//@access Private/Admin
const updateProduct = async (req, res) => {
  try {
    const { name, price, description, image, brand, category, countInStock } =
      req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    //handle
  }
};

export {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
};
