const express = require("express");
const Product = require("../models/Product");
const Category = require("../models/Category");
const router = express.Router();

router.get("/product", async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
});

router.get("product/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
});

router.post("product/", async (req, res, next) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({message: "Product created successfully"});
    } catch (error) {
        next(error);
    }
});

router.put("product/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        await Product
        .findById (id)
        .updateOne(req.body);
        res.status(200).json({message: "Product updated successfully"});
    } catch (error) {
        next(error);
    }
});

router.delete("product/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        await Product.findByIdAndDelete(id);
        res.status(200).json({message: "Product deleted successfully"});
    } catch (error) {
        next(error);
    }
});

router.get("/category/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        const category = await Category.findById(id);
        const products = await Product.find({category: category.name});
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
});
module.exports = router;
