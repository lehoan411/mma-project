const express = require("express");
const Account = require("../models/Account");
const jwt = require("jsonwebtoken"); // Sử dụng jsonwebtoken để tạo token
const router = express.Router();
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

router.post("/register", async (req, res, next) => {
    try {
        const account = new Account(req.body);
        await account.save();
        res.status(201).json({message: "Account created successfully"});
    } catch (error) {
        next(error);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const account = await Account.findOne({ username, password });
        if (!account) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Tạo token nếu username và password đúng
        const token = jwt.sign({ userId: account._id }, SECRET_KEY, { expiresIn: "1h" });

        // Trả về token cho client
        res.status(200).json({ token, message: "Login successfully" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;