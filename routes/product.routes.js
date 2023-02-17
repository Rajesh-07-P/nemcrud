const express = require("express");
const { authentication } = require("../middlewares/auth.middleware");
const { ProdModel } = require("../models/product.model");

const productRouter = express.Router();
productRouter.use(authentication);

productRouter.get("/", async (req, res) => {
  try {
    let products = await ProdModel.find();
    res.send(products);
  } catch (err) {
    console.log(err);
    res.send("Something went wrong");
  }
});

productRouter.post("/addproduct", async (req, res) => {
  let payload = req.body;
  try {
    let prod = new ProdModel(payload);
    await prod.save();
    res.send("product added");
  } catch (err) {
    console.log(err);
    res.send("Cannot post");
  }
});

productRouter.patch("/updateprod/:id", async (req, res) => {
  const payload = req.body;
  console.log(payload);
  const id = req.params.id;
  const userID = req.body.userID;
  try {
    const prod = await ProdModel.findOne({ _id: id });
    if (userID == prod.userID) {
      await ProdModel.findByIdAndUpdate({ _id: id }, payload);
      res.send("product updated");
    } else {
      res.send("Not Authorized");
    }
  } catch (err) {
    console.log(err);
    res.send("Cannot update product");
  }
});

productRouter.delete("/deleteprod/:id", async (req, res) => {
  const id = req.params.id;
  const userID = req.body.userID;
  try {
    const prod = await ProdModel.findOne({ _id: id });
    if (userID == prod.userID) {
      await ProdModel.findByIdAndDelete({ _id: id });
      res.send("product deleted");
    } else {
      res.send("Not Authorized");
    }
  } catch (err) {
    console.log(err);
    res.send("Cannot delete product");
  }
});

module.exports = {
  productRouter,
};
