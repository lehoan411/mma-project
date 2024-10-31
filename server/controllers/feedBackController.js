const express = require("express");
const FeedBack = require("../models/FeedBack");
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const feedBacks = await FeedBack.find();
        res.status(200).json(feedBacks);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        const feedBack = await FeedBack
        .findById(id);
        res.status(200).json(feedBack);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const feedBack = new FeedBack(req.body);
        await feedBack.save();
        res.status(201).json({message: "FeedBack created successfully"});
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        await FeedBack
        .findById(id)
        .updateOne(req.body);
        res.status(200).json({message: "FeedBack updated successfully"});
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        await FeedBack.findByIdAndDelete(id);
        res.status(200).json({message: "FeedBack deleted successfully"});
    } catch (error) {
        next(error);
    }
});

module.exports = router;