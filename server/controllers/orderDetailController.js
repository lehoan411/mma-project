const express = require("express");
const OrderDetail = require("../models/OrderDetail");
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const orderDetails = await OrderDetail.find();
        res.status(200).json(orderDetails);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        const orderDetail = await OrderDetail.findById(id);
        res.status(200).json(orderDetail);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const orderDetail = new OrderDetail(req.body);
        await orderDetail.save();
        res.status(201).json({message: "OrderDetail created successfully"});
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        await OrderDetail   
        .findById (id)
        .updateOne(req.body);
        res.status(200).json({message: "OrderDetail updated successfully"});
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        await OrderDetail.findByIdAndDelete(id);
        res.status(200).json({message: "OrderDetail deleted successfully"});
    } catch (error) {
        next(error);
    }
});

module.exports = router;