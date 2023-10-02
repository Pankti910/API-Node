const Product = require("../models/Product");
const constant = require("../constant");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// Create a new product
exports.addProduct = async (req, res) => {
  try {
    const { name, size, colour, price, quantity } = req.body;

    // Create a new product record
    const newProduct = await Product.create({
      name,
      size,
      colour,
      price,
      quantity,
    });

    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: constant.MESSAGE.INTERNAL_SERVER_ERROR });
  }
};

//update existing product
exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findOne({ where: { id: req.params.id } });
    if (product) {
      await product.update(req.body);

      res.status(200).json({ message: constant.MESSAGE.PRODUCT_UPDATE });
    } else {
      res.status(400).json({ error: constant.MESSAGE.INVALID_ID });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: constant.MESSAGE.INTERNAL_SERVER_ERROR });
  }
};

//delete product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: constant.MESSAGE.PRODUCT_DELETE });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: constant.MESSAGE.INVALID_ID });
  }
};

//get product with the sorting,pagination,search
exports.getProducts = async (req, res) => {
  try {
    let query = {};

    //check if sorting is applied or not
    if (req.body.sort) {
      //iterate over the sorting keys as in future there are possibilities that sort keys can be changed
      let sortKeys = Object.keys(req.body.sort);
      query["order"] = [];
      sortKeys.forEach((key) => {
        let keyArray = [key, req.body.sort[key]];
        query["order"].push(keyArray);
      });
    }
    if (req.body.searchByName && req.body.searchByName != "") {
      query["where"] = {
        name: {
          [Op.like]: `%${req.body.searchByName}%`,
        },
      };
    }
    if (req.body.page) {
      if (req.body.page === 1) {
        query["offset"] = 0;
        query["limit"] = 1;
      } else {
        let offset = 1 + (page - 2) * 2;
        query["offset"] = offset;
        query[limit] = 2;
      }
    }
    let products = await Product.findAll(query);
    res.status(200).json({ products: products });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: constant.MESSAGE.INTERNAL_SERVER_ERROR });
  }
};

