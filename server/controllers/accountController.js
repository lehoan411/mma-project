const express = require("express");
const Account = require("../models/Account");
const jwt = require("jsonwebtoken"); // Sử dụng jsonwebtoken để tạo token
const router = express.Router();
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

router.post("/register", async (req, res) => {
    const { username, email, password, mobile, address } = req.body;

    // Validation
    if (!username || !email || !password || !mobile || !address) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(mobile)) {
        return res.status(400).json({ message: "Phone number must be 10 digits" });
    }

    try {
        const existingUser = await Account.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }


        const account = new Account({
            username,
            email,
            password,
            mobile,
            address
        });

        await account.save();
        res.status(201).json({ message: "Account created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
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
        res.status(200).json({ token,
            user: {
                userId: account._id,
                username: account.username,
                email: account.email,
                address: account.address,
                mobile: account.mobile,
                role: account.role
            },
            message: "Login successfully" });
    } catch (error) {
        next(error);
    }
});

router.put("/update-profile/:id", async (req, res) => {
    const userId = req.params.id;
    const { username, email, address, mobile } = req.body;

    try {
        const updatedUser = await Account.findByIdAndUpdate(
            userId,
            { username, email, address, mobile },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user: updatedUser, message: "Profile updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/change-password/:id", async (req, res) => {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    try {
        // Find the user by ID
        const user = await Account.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the current password matches
        if (user.password !== currentPassword) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        // Update the password
        user.password = newPassword;
        await user.save();

        res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;