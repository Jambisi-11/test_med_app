

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const UserSchema = require('../models/User');
const passport = require('passport');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'thisiscodeformediclapplicationwhichisbuiltinreactappproject';

// Session configuration
router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
}));

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    cb(null, id);
});

// Route 1: Register a new user - POST: http://localhost:8181/api/auth/register
router.post('/register', [
    body('email', "Please enter a valid email").isEmail(),
    body('name', "Username should be at least 4 characters").isLength({ min: 4 }),
    body('password', "Password should be at least 8 characters").isLength({ min: 8 }),
    body('phone', "Phone number should be 10 digits").isLength({ min: 10 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if user already exists
        const existingUser = await UserSchema.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: "A user with this email already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create new user
        const newUser = await UserSchema.create({
            email: req.body.email,
            name: req.body.name,
            password: hashedPassword,
            phone: req.body.phone,
            createdAt: Date(),
        });

        // Generate JWT token
        const payload = {
            user: {
                id: newUser.id,
            },
        };
        const authtoken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        res.json({ authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

// Route 2: User login - POST: http://localhost:8181/api/auth/login
// router.post('/login', [
//     body('email', "Please enter a valid email").isEmail(),
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//         const { email, password } = req.body;

//         // Find user by email
//         const user = await UserSchema.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ error: "Invalid credentials" });
//         }

//         // Compare passwords
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ error: "Invalid credentials" });
//         }

//         // Generate JWT token
//         const payload = {
//             user: {
//                 id: user.id,
//             },
//         };
//         const authtoken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
//         res.json({ authtoken });

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ error: "Internal Server Error", details: error.message });
//     }
// });

// Route 2: User login - POST: http://localhost:8181/api/auth/login
router.post('/login', [
    body('email', "Please enter a valid email").isEmail(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await UserSchema.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const payload = {
            user: {
                id: user.id,
            },
        };
        const authtoken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        // ✅ Return token AND user name
        res.json({
            authtoken,
            name: user.name, // 🔥 Make sure this is included
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});


// Route 3: Update user details - PUT: http://localhost:8181/api/auth/update
router.put('/update', [
    body('name', "Username should be at least 4 characters").isLength({ min: 4 }),
    body('phone', "Phone number should be 10 digits").isLength({ min: 10 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, phone } = req.body;
        const email = req.headers.email;

        if (!email) {
            return res.status(400).json({ error: "Email not found in the request headers" });
        }

        // Find and update user
        const user = await UserSchema.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.name = name;
        user.phone = phone;
        user.updatedAt = Date();

        await user.save();

        // Generate JWT token
        const payload = {
            user: {
                id: user.id,
            },
        };
        const authtoken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        res.json({ authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

// Route 4: Fetch user data - GET: http://localhost:8181/api/auth/user
router.get('/user', async (req, res) => {
    try {
        const email = req.headers.email;

        if (!email) {
            return res.status(400).json({ error: "Email not found in the request headers" });
        }

        const user = await UserSchema.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Send only necessary details
        const userDetails = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };

        res.json(userDetails);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

module.exports = router;