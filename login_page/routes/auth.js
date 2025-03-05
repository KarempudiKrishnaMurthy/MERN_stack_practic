// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const router = express.Router();
// require('dotenv').config();

// // Middleware to verify JWT
// const authenticateToken = (req, res, next) => {
//     const token = req.header('Authorization');
//     if (!token) {
//         return res.status(401).json({ msg: "Access denied. No token provided." });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (err) {
//         res.status(400).json({ msg: "Invalid token" });
//     }
// };

// // Register Route
// router.post('/register', async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         let user = await User.findOne({ username });
//         if (user) {
//             return res.status(400).json({ msg: "User already exists" });
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         user = new User({ username, password: hashedPassword, loginTimestamps: [], logoutTimestamps: [] });
//         await user.save();

//         res.status(201).json({ msg: "User registered successfully" });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ msg: "Server error" });
//     }
// });

// // Login Route (Generates JWT)
// router.post('/login', async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const user = await User.findOne({ username });

//         if (!user) return res.status(400).json({ msg: "User not found" });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

//         user.loginTimestamps.push(new Date());
//         await user.save();

//         const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.json({ msg: "Login successful", token, loginTime: user.loginTimestamps[user.loginTimestamps.length - 1] });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ msg: "Server error" });
//     }
// });

// // Logout Route (Requires Token)
// router.post('/logout', authenticateToken, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.userId);
//         if (!user) return res.status(400).json({ msg: "User not found" });

//         user.logoutTimestamps.push(new Date());
//         await user.save();

//         res.json({ msg: "Logged out successfully", logoutTime: user.logoutTimestamps[user.logoutTimestamps.length - 1] });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ msg: "Server error" });
//     }
// });

// // Protected Route Example (Get User Profile)
// router.get('/profile', authenticateToken, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.userId).select("-password");
//         res.json(user);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ msg: "Server error" });
//     }
// });

// module.exports = router;


const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
require('dotenv').config();

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    
    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(400).json({ msg: "Invalid token" });
    }
};

// ✅ Register Route
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        let user = await User.findOne({ username });
        if (user) return res.status(400).json({ msg: "User already exists" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ username, password: hashedPassword, loginTimestamps: [], logoutTimestamps: [] });
        await user.save();

        return res.status(201).json({ msg: "User registered successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error" });
    }
});

// ✅ Login Route (JWT Token)
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("Received Login Request:", { username, password });

        const user = await User.findOne({ username });
        if (!user) {
            console.log("User not found!");
            return res.status(400).json({ msg: "User not found" });
        }

        console.log("Found User:", user.username);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password Match:", isMatch);

        if (!isMatch) {
            console.log("Invalid credentials!");
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        user.loginTimestamps.push(new Date());
        await user.save();

        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log("Login Successful! Sending Token...");
        res.json({ msg: "Login successful", token, loginTime: user.loginTimestamps[user.loginTimestamps.length - 1] });

    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json({ msg: "Server error" });
    }
});


// ✅ Logout Route
router.post('/logout', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(400).json({ msg: "User not found" });

        user.logoutTimestamps.push(new Date());
        await user.save();

        return res.json({ msg: "Logged out successfully", logoutTime: user.logoutTimestamps[user.logoutTimestamps.length - 1] });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error" });
    }
});

// ✅ Get User Profile (Protected)
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        return res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
