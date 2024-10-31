const express = require("express");
const Cart = require("../models/Cart");
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        const cart = await Cart.findById(id);
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const cart = new Cart(req.body);
        await cart.save();
        res.status(201).json({message: "Cart created successfully"});
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        await Cart
        .findById (id)
        .updateOne(req.body);
        res.status(200).json({message: "Cart updated successfully"});
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        await Cart.findByIdAndDelete(id);
        res.status(200).json({message: "Cart deleted successfully"});
    } catch (error) {
        next(error);
    }
});

module.exports = router;