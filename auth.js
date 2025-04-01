const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");  // ✅ Ensure correct path


router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        app.post("/login", async (req, res) => {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
          
            if (!user || user.password !== password) {
              return res.status(401).json({ error: "Invalid credentials" });
            }
          
            const token = generateToken(user._id);
            res.json({ token, username: user.username });
          });
          



        res.status(201).json({ message: "Signup successful", token });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
