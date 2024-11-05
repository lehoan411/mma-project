const express = require("express");
const Cart = require("../models/Cart");
const router = express.Router();
const mongoose = require("mongoose");
const { verifyToken } = require("../middlewares/authMiddleware");

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
        const { id } = req.params;
        const cart = await Cart.findOne({ cid: id }).populate('product.pid'); // Tìm giỏ hàng của người dùng
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
});

router.post("/add-to-cart", async (req, res, next) => {
    try {
        const { cid, product } = req.body;

        // Convert product's `pid` to ObjectId if it isn’t already
        if (!mongoose.Types.ObjectId.isValid(cid) || !mongoose.Types.ObjectId.isValid(product.pid)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        product.pid = new mongoose.Types.ObjectId(product.pid);

        // Find the user's cart
        let cart = await Cart.findOne({ cid });

        if (!cart) {
            // If cart does not exist, create a new one
            cart = new Cart({ cid, product: [product] });
            console.log("Creating new cart with product:", product);
        } else {
            // Check if the product already exists in the cart
            const existingProduct = cart.product.find(p => p.pid.equals(product.pid));
            if (existingProduct) {
                // If it exists, update the quantity
                existingProduct.quantity += product.quantity;
                console.log("Updating quantity for existing product:", existingProduct);
            } else {
                // Otherwise, add it as a new product
                cart.product.push(product);
                console.log("Adding new product to existing cart:", product);
            }
        }

        // Save the cart to the database
        await cart.save();
        console.log("Cart saved successfully:", cart);

        res.status(201).json({ message: "Cart updated successfully" });
    } catch (error) {
        console.error("Error in add-to-cart route:", error);
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

router.delete("/:cartId/product/:productId", async (req, res, next) => {
    try {
        const { cartId, productId } = req.params;
        console.log("Received delete request for cartId:", cartId, "productId:", productId);

        const cart = await Cart.findOne({ cid: cartId });
        if (!cart) {
            console.log("Cart not found for cartId:", cartId);
            return res.status(404).json({ message: "Cart not found" });
        }

        // Filter out the product to be removed
        cart.product = cart.product.filter((p) => !p.pid.equals(productId));

        await cart.save();
        res.status(200).json({ message: "Product removed from cart" });
    } catch (error) {
        console.error("Error removing product from cart:", error);
        next(error);
    }
});
module.exports = router;